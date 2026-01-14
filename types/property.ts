import { Broker } from "./broker";

export type Property = {
  id: string;
  propertyName: string;
  neighborhood: string;
  street: string;
  city: string;
  priceNIS: number;
  beds: number;
  baths: number;
  indoorSqm: number;
  outdoorSqm: number;
  broker_id: string;
  broker?: Broker;
  heroImageUrl: string;
  backdropImageUrl: string;
  thumbImageUrl: string;
};
