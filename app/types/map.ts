export type Category =
  | 'architecture'
  | 'restaurants'
  | 'parks'
  | 'medicine'
  | 'products'
  | 'shopping'
  | 'leisure'
  | 'hotels'
  | 'entertainment'
  | 'coffee'
  | 'beach'
  | 'beauty';

export type Point = {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  category: Category;
  type?: string;
  address?: string;
};

export type RouteStop = {
  order: number;
  pointId: number;
  lat: number;
  lng: number;
  name: string;
};

export type Route = {
  id: number;
  name: string;
  description: string;
  color: string;
  tags: string[];
  stops: RouteStop[];
};

export type DisplayedPoint = {
  id: number;
  category: Category;
  lat: number;
  lng: number;
};