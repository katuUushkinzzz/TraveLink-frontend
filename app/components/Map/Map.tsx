import { useMemo, useState, useEffect, ActionDispatch } from 'react';

import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  Polyline,
  useMapEvents,
  useMap,
} from 'react-leaflet';

import L from 'leaflet';

import { Category, PinData } from '@/app/types/localTypes';
import { State, Action } from '@/app/utils/reducer';

interface Bounds {
  northEast: { lat: number; lng: number };
  southWest: { lat: number; lng: number };
}

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


function ZoomHandler({ onZoomend }: { onZoomend: (zoom: number) => void }) {
  const map = useMapEvents({
    zoomend: () => onZoomend(map.getZoom())
  });

  return null;
}

function MapMoveHandler({ onMapMoveEnd }: { onMapMoveEnd: (bounds: Bounds) => void }) {
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

function ResetMapCenterHandler({ routePath, panelShown, addPanelShown }:
  {
    routePath: [number, number][], panelShown: boolean, addPanelShown: boolean
  }) {
  const map = useMap()

  useEffect(() => {
    if (routePath.length < 1) return

    const bounds = [
      routePath.reduce((min, curr) => [min[0] <= curr[0] ? min[0] : curr[0], min[1] <= curr[1] ? min[1] : curr[1]]),
      routePath.reduce((max, curr) => [max[0] >= curr[0] ? max[0] : curr[0], max[1] >= curr[1] ? max[1] : curr[1]])
    ]

    console.log((panelShown ? 525 : 0) + (addPanelShown ? 525 : 0))
    map.fitBounds(bounds, {
      paddingTopLeft: [(panelShown ? 525 : 0) + (addPanelShown ? 525 : 0), 0]
    })
  }, [routePath, panelShown, addPanelShown, map])

  return null
}

export default function Map({ state, dispatch }:
  {
    state: State, dispatch: ActionDispatch<[action: Action]>
  }) {
  const [activePointId, setActivePointId] = useState<number | null>(null);
  const [displayedPoints, setDisplayedPoints] = useState<PinData[] | null>(null);

  const [routePointIds, setRoutePointIds] = useState<number[]>([]);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

  const [zoom, setZoom] = useState<number>(12);

  function fetchPins(bounds: Bounds) {
    fetch("http://217.60.36.77:4000/point/getPolyPoint", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(bounds)
    })
      .then(r => r.json())
      .then((j) => {
        setDisplayedPoints(
          j.map((p: { id: number, category: Category, coordinates: { coordinates: number[] } }) => {

            return {
              id: p.id - 1,
              category: (p.category ?? 'unknown'),
              lat: p.coordinates.coordinates[1],
              lng: p.coordinates.coordinates[0],
            };
          })
        )
      })
  }

  useEffect(() => {
    async function fetchPath() {
      if (!state.routeData || state.routeData?.stops.length < 2) {
        setRouteCoords([]);
        return;
      }

      const coords = state.routeData.stops
        .map((stop) => `${stop.lng},${stop.lat}`)
        .join(';');

      setRouteCoords([]);

      const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`)

      if (!res.ok) {
        console.error('OSRM error:', res.status, res.statusText);
        return;
      }

      const data = await res.json()

      if (!data.routes?.[0]?.geometry?.coordinates) {
        console.error('Маршрут не найден:', data);
        return;
      }

      const path: [number, number][] = data.routes[0].geometry.coordinates.map(
        ([lng, lat]: [number, number]) => [lat, lng]
      );

      setRouteCoords(path);
      setRoutePointIds(state.routeData.stops.map(s => s.id))
    };

    fetchPath()
  }, [state.routeData, dispatch]);


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
      unknown: {
        circle: createIcon('/search-window/route-previews/checker.png', [circleSize, circleSize], [circleSize / 2, circleSize / 2]),
        pin: createIcon('/search-window/route-previews/checker.png', [pinWidth, pinHeight], [pinWidth / 2, pinHeight]),
      }
    };
  }, [circleSize, pinWidth, pinHeight]);

  return (
    <MapContainer
      center={[47.219, 38.925]}
      zoom={zoom}
      zoomControl={false}
      style={{ height: '100vh', width: '100%', zIndex: 0 }}
      attributionControl={false}
    >
      <ZoomHandler onZoomend={setZoom} />
      <ZoomControl position="topright" />
      <ResetMapCenterHandler routePath={routeCoords} panelShown={state.isPanelShown} addPanelShown={state.isAddPanelShown} />

      <MapMoveHandler
        onMapMoveEnd={(bounds) => fetchPins(bounds)}
      />

      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <Polyline
        positions={routeCoords}
        pathOptions={{
          color: "#922b2b",
          weight: 5,
          opacity: 0.85,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />

      {state.routeData?.stops.map((stop, i) => (
        <Marker
          key={`route-stop-${state.routeData?.id}-${stop.id}`}
          position={[stop.lat, stop.lng]}
          icon={createNumberedIcon(i + 1, "#922b2b", 32)}
          zIndexOffset={3000}
          eventHandlers={{
            click: () => {
              setActivePointId(activePointId === stop.id ? null : stop.id);
            },
          }}
        />
      ))}

      {displayedPoints &&
        displayedPoints.map((point) => {
          if (routePointIds.includes(point.id)) return

          const pointIcons = icons[point.category];

          const isActive = activePointId === point.id;
          const pointIcon = isActive ? pointIcons.pin : pointIcons.circle;

          return (
            <Marker
              alt={point.id.toString()}
              key={point.id}
              position={[point.lat, point.lng]}
              icon={pointIcon}
              zIndexOffset={0}
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