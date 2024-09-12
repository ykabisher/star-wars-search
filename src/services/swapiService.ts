import { APICategoryResultWrapper, APISearchResults, CategorySearchResult, Person, SEARCH_TYPE } from "../consts/dataTypes";

const STAR_WARS_API_URL = "https://swapi.dev/api";

export type OtherStarWarsStracture = any; // not best practice, there should be all the types available here

export class SearchAPI {
  static fetchCategoryResults = async (searchValue: string, type: SEARCH_TYPE, page: number = 1): Promise<CategorySearchResult> => {
    try {
      const results = await fetch(`${STAR_WARS_API_URL}/${type}/?search=${searchValue}&page=${page}`);
      if (!results.ok) throw new Error(`Failed to fetch data for ${type}`);
      const jsonResult: APICategoryResultWrapper<any> = await results.json();
      return jsonResult;
    } catch (error) {
      console.error(`Error fetching category ${type}:`, error);
      throw error; 
    } 
  }; 

  static searchAllCategories = async (searchValue: string): Promise<APISearchResults> => {
    const searchTypes = Object.values(SEARCH_TYPE);

    // Create promises for all API calls
    const promises = searchTypes.map((type) =>
      SearchAPI.fetchCategoryResults(searchValue, type).then((results) => ({
        type,
        results,
      }))
    );

    // Wait for all API calls to finish
    const allResults = await Promise.all(promises);

    // Aggregate results into a single object
    const aggregatedResults: APISearchResults = {
      starWarsData: {
        people: [],
        planets: [],
        vehicles: [],
        starships: [],
        species: [],
      },
      totals: {
        people: 0,
        planets: 0,
        vehicles: 0,
        starships: 0,
        species: 0,
      },
    };

    allResults.forEach(({ type, results }) => {
      // Cache some results?
      if (results.count) {
        aggregatedResults.starWarsData[type] = results.results;
        aggregatedResults.totals[type] = results.count;
      }
    });

    return aggregatedResults;
  };
}
