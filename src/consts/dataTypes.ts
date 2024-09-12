export enum SEARCH_TYPE {
  PEOPLE = "people",
  PLANETS = "planets",
  VEHICLES = "vehicles",
  STARSHIPS = "starships",
  SPECIES = "species",
}

export const SEARCH_TYPE_ENTITY_ALL = "ALL";

export type CategoryData = {
  name: string;
  totalItems: number | undefined;
  searchString: string;
  data: BasicPersonInfo[] | any;
} | null;

export type Person = {
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
} & BasicPersonInfo;

export type BasicPersonInfo = {
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  url: string;
};

export type Planet = { url: string; name: string; rotation_period: string; orbital_period: string; diameter: string; climate: string; gravity: string; terrain: string; population: string };
export type Vehicle = { url: string; name: string; model: string; manufacturer: string; cost_in_credits: string };
export type Starship = { url: string; name: string; model: string; starship_class: string };
export type Species = { url: string; name: string; classification: string; language: string; average_lifespan: string };

export type APICategoryResultWrapper<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type APISearchResults = {
  starWarsData: {
    people: BasicPersonInfo[];
    planets: Planet[];
    vehicles: Vehicle[];
    starships: Starship[];
    species: Species[];
  };
  totals: {
    people: number;
    planets: number;
    vehicles: number;
    starships: number;
    species: number;
  };
} | null;

export type CategorySearchResult = Person | any;
