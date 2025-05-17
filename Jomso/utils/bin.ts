/** @format */

// types/Bin.ts
export type Bin = {
  id: string;
  address: string;
  lat: number;
  lng: number;
  fill: number;
  type?: string;
  lastEmptiedAt?: string;
  size: string;
};
