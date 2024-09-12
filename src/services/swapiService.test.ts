import { SearchAPI } from './swapiService'; 
import { SEARCH_TYPE, APICategoryResultWrapper, BasicPersonInfo, Planet } from "../consts/dataTypes";

global.fetch = jest.fn();
const mockFetch = fetch as jest.Mock;

const mockPerson: BasicPersonInfo = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  eye_color: 'blue',
  gender: 'male',
  hair_color: 'blond',
  height: '172',
  homeworld: 'https://swapi.dev/api/planets/1/',
  mass: '77',
  skin_color: 'fair',
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};

const mockPlanet: Planet = {
  name: 'Tatooine',
  rotation_period: '23',
  orbital_period: '304',
  diameter: '10465',
  climate: 'arid',
  gravity: '1 standard',
  terrain: 'desert',
  population: '200000',
  url: 'https://swapi.dev/api/planets/2/',
};

describe('SearchAPI', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchCategoryResults: should fetch and return category results', async () => {
    const mockResponse: APICategoryResultWrapper<BasicPersonInfo> = { count: 1, next: null, previous: null, results: [mockPerson] };
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockResponse });

    const result = await SearchAPI.fetchCategoryResults('Luke', SEARCH_TYPE.PEOPLE, 1);
    expect(mockFetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?search=Luke&page=1');
    expect(result).toEqual(mockResponse);
  });

  it('fetchCategoryResults: should throw an error on failed fetch', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    await expect(SearchAPI.fetchCategoryResults('Luke', SEARCH_TYPE.PEOPLE, 1)).rejects.toThrow('Failed to fetch data for people');
  });

  it('searchAllCategories: should throw error if one category request fails', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => ({ count: 1, results: [mockPerson] }) }) // People
      .mockResolvedValueOnce({ ok: false }); // Planets

    await expect(SearchAPI.searchAllCategories('Luke')).rejects.toThrow();
  });
});
