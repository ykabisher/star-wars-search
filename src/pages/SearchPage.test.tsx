// SearchPage.test.tsx
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import SearchPage from "./SearchPage";
import useAPI from "../hooks/useAPI";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_TYPE, APISearchResults } from "../consts/dataTypes";

jest.mock("../hooks/useAPI");
jest.mock("../hooks/useDebounce");

// Mock data for API response
const mockSearchResults: APISearchResults = {
  starWarsData: {
    people: [
      {
        name: "Luke Skywalker",
        url: "luke-url",
        birth_year: "19BBY",
        gender: "male",
        height: "172",
        eye_color: "blue",
        hair_color: "blond",
        mass: "77",
        skin_color: "fair",
        created: "",
        edited: "",
        homeworld: "",
      },
    ],
    planets: [],
    vehicles: [],
    starships: [],
    species: [],
  },
  totals: {
    people: 1,
    planets: 0,
    vehicles: 0,
    starships: 0,
    species: 0,
  },
};

afterEach(() => {
  cleanup();
});

describe("SearchPage", () => {
  const mockSetCategoryData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDebounce as jest.Mock).mockImplementation((value) => value);
  });

  it("renders search input and title", () => {
    (useAPI as jest.Mock).mockReturnValue({ searchResults: null, loading: false, error: false });
    render(<SearchPage setCategoryData={mockSetCategoryData} />);

    expect(screen.getByPlaceholderText("Search for Star Wars data...")).toBeInTheDocument();
    expect(screen.getByText("Star Wars Search Engine")).toBeInTheDocument();
  });

  it("displays error message when error is true", () => {
    (useAPI as jest.Mock).mockReturnValue({ searchResults: null, loading: false, error: true });

    render(<SearchPage setCategoryData={mockSetCategoryData} />);

    expect(screen.getByText("Sorry, there seems to be an issue, please try again later")).toBeInTheDocument();
  });

});
