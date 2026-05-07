'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  Polyline,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';

import { points } from '../data/points';
import { routes } from '../data/routes';
import type { Category, DisplayedPoint } from '../types/map';


function createIcon(
  iconUrl: string,
  iconSize: [number, number],
  iconAnchor: [number, number]
) {
  return L.icon({
    iconUrl,
    iconSize,
    iconAnchor,
    popupAnchor: [0, -iconSize[1] + 10],
  });
}

function createNumberedIcon(number: number, color: string, size: number) {
  const svg = `
    <svg width="${size}" height="${size * 1.4}" viewBox="0 0 40 56" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C9 0 0 9 0 20C0 20 0 22 2 26L20 56L38 26C40 22 40 20 40 20C40 9 31 0 20 0Z" fill="${color}"/>
      <circle cx="20" cy="20" r="14" fill="white"/>
      <text x="20" y="26" text-anchor="middle" font-size="16" font-weight="bold" fill="${color}" font-family="Arial, sans-serif">${number}</text>
    </svg>
  `;
  const url = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  return L.icon({
    iconUrl: url,
    iconSize: [size, size * 1.4],
    iconAnchor: [size / 2, size * 1.4],
    popupAnchor: [0, -size * 1.4],
  });
}


function ZoomHandler({
  onZoomChange,
}: {
  onZoomChange: (zoom: number) => void;
}) {
  const map = useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom());
    },
  });

  return null;
}

function MapMoveHandler({
  onMapMoveEnd,
}: {
  onMapMoveEnd: (bounds: {
    northEast: { lat: number; lng: number };
    southWest: { lat: number; lng: number };
  }) => void;
}) {
  useMapEvents({
    dragend: (event) => {
      const map = event.target;
      const bounds = map.getBounds();

      onMapMoveEnd({
        northEast: {
          lat: bounds.getNorthEast().lat,
          lng: bounds.getNorthEast().lng,
        },
        southWest: {
          lat: bounds.getSouthWest().lat,
          lng: bounds.getSouthWest().lng,
        },
      });
    },
  });

  return null;
}

export default function Map() {
  const [activePointId, setActivePointId] = useState<number | null>(null);

  const [displayedPoints, setDisplayedPoints] = useState<DisplayedPoint[] | null>(null);
  const [zoom, setZoom] = useState(12);

  const [activeRouteId, setActiveRouteId] = useState<number>(1);
  

const activeRoute = routes.find((route) => route.id === activeRouteId) ?? routes[0];

const routePointIds = activeRoute.stops.map((stop) => stop.pointId);

const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

useEffect(() => {
  const fetchRoute = async () => {
    if (!activeRoute || activeRoute.stops.length < 2) {
      setRouteCoords([]);
      return;
    }

    const coords = activeRoute.stops
      .map((stop) => `${stop.lng},${stop.lat}`)
      .join(';');

    const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;

    try {
      setRouteCoords([]);

      const res = await fetch(url);

      if (!res.ok) {
        console.error('OSRM error:', res.status, res.statusText);
        return;
      }

      const data = await res.json();

      if (!data.routes?.[0]?.geometry?.coordinates) {
        console.error('Маршрут не найден:', data);
        return;
      }

      const path: [number, number][] = data.routes[0].geometry.coordinates.map(
        ([lng, lat]: [number, number]) => [lat, lng]
      );

      setRouteCoords(path);
    } catch (err) {
      console.error('Ошибка загрузки маршрута:', err);
      setRouteCoords([]);
    }
  };

  fetchRoute();
}, [activeRouteId]);


  const circleSize =
  zoom <= 12 ? 3 :
  zoom <= 13 ? 4 :
  zoom <= 14 ? 6 :
  zoom <= 15 ? 10 :
  zoom <= 16 ? 16 :
  24;

const pinWidth =
  zoom <= 12 ? 10 :
  zoom <= 13 ? 12 :
  zoom <= 14 ? 16 :
  zoom <= 15 ? 22 :
  zoom <= 16 ? 30 :
  40;

const pinHeight =
  zoom <= 12 ? 14 :
  zoom <= 13 ? 16 :
  zoom <= 14 ? 22 :
  zoom <= 15 ? 30 :
  zoom <= 16 ? 42 :
  56;

  const icons = useMemo(() => {
    return {
      architecture: {
        circle: createIcon('/map-icons/architecture-circle.svg', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/map-icons/architecture-pin.svg', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      },
      restaurants: {
        circle: createIcon('/map-icons/restaurants-circle.svg', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/map-icons/restaurants-pin.svg', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      },
      parks: {
        circle: createIcon('/map-icons/parks-circle.svg', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/map-icons/parks-pin.svg', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      },
      medicine: {
        circle: createIcon('/map-icons/medicine-circle.svg', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/map-icons/medicine-pin.svg', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      },
      products: {
        circle: createIcon('/map-icons/products-circle.svg', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/map-icons/products-pin.svg', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      },
      shopping: {
        circle: createIcon('/map-icons/shopping-circle.svg', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/map-icons/shopping-pin.svg', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      },
      leisure: {
        circle: createIcon('/map-icons/leisure-circle.svg', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/map-icons/leisure-pin.svg', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      },
      hotels: {
        circle: createIcon('/map-icons/hotels-circle.svg', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/map-icons/hotels-pin.svg', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      },
      entertainment: {
        circle: createIcon('/map-icons/entertainment-circle.svg', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/map-icons/entertainment-pin.svg', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      },
      coffee: {
        circle: createIcon('/map-icons/coffee-circle.svg', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/map-icons/coffee-pin.svg', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      },
      beach: {
        circle: createIcon('/map-icons/beach-circle.svg', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/map-icons/beach-pin.svg', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      },
      beauty: {
        circle: createIcon('/map-icons/beauty-circle.svg', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/map-icons/beauty-pin.svg', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      },
    };
  }, [circleSize, pinWidth, pinHeight]);

  return (
    <MapContainer
      center={[47.219, 38.925]}
      zoom={12}
      zoomControl={false}
      style={{ height: '100vh', width: '100%' }}
      
    >
      <ZoomHandler onZoomChange={setZoom} />

       <MapMoveHandler
        onMapMoveEnd={(bounds) => {
          //console.log('Map dragged. New bounds:', bounds);

          console.log(bounds)

          fetch("http://217.60.36.77:4000/point/getPolyPoint", {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },

            body: JSON.stringify(bounds)
          }).then(r => r.json())
            .then((j) => setDisplayedPoints(
              j.map((p: any) => {
                const localPoint = points.find((point) => point.id === p.id);

                return {
                  id: p.id,
                  category: (p.category ?? localPoint?.category ?? 'architecture') as Category,
                  lat: p.coordinates.coordinates[1],
                  lng: p.coordinates.coordinates[0],
                };
              })
            )
          )

          // send your request here
          // fetch(`/api/places?neLat=${bounds.northEast.lat}&neLng=${bounds.northEast.lng}&swLat=${bounds.southWest.lat}&swLng=${bounds.southWest.lng}`)
        }}
      />

      <TileLayer
    
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />


      <ZoomControl position="topright" />

      <div
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {routes.map((route) => (
        <button
          key={route.id}
          type="button"
          onClick={() => setActiveRouteId(route.id)}
          style={{
            border: 'none',
            borderRadius: 14,
            padding: '10px 14px',
            cursor: 'pointer',
            background: activeRouteId === route.id ? route.color : '#ffffff',
            color: activeRouteId === route.id ? '#ffffff' : '#333333',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontWeight: 700,
            textAlign: 'left',
          }}
        >
          {route.name}
        </button>
      ))}
    </div>

      {routeCoords.length > 1 && (
        <Polyline
          positions={routeCoords}
          pathOptions={{
            color: activeRoute.color,
            weight: 5,
            opacity: 0.85,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />
      )}

      {activeRoute.stops.map((stop) => (
      <Marker
        key={`route-stop-${activeRoute.id}-${stop.pointId}`}
        position={[stop.lat, stop.lng]}
        icon={createNumberedIcon(stop.order, activeRoute.color, 32)}
        zIndexOffset={3000}
      />
    ))}

    {displayedPoints &&
    displayedPoints.map((point) => {
      const isActive = activePointId === point.id;
      const isRoutePoint = routePointIds.includes(point.id);

      const pointIcons = icons[point.category] ?? icons.architecture;

      const pointIcon =
        isActive || isRoutePoint
          ? pointIcons.pin
          : pointIcons.circle;

      return (
        <Marker
          key={point.id}
          position={[point.lat, point.lng]}
          icon={pointIcon}
          zIndexOffset={isRoutePoint ? 1000 : 0}
          eventHandlers={{
            click: () => {
              setActivePointId(activePointId === point.id ? null : point.id);
            },
          }}
        />
      );
    })}  
    </MapContainer>
  );
}