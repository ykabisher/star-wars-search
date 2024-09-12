import { useEffect, useRef, useState } from "react";
import useAPI from "../hooks/useAPI";
import { APISearchResults, CategoryData, SEARCH_TYPE } from "../consts/dataTypes";
import styles from "./SearchPage.module.css";
import Button from "../components/Button/Button";
import useDebounce from "../hooks/useDebounce";

interface SearchProps {
  setCategoryData: (categoryData: CategoryData) => void;
}

interface EntityProp {
  icon: string;
  title: string;
}

const ENTITY_PROPS: Record<string, EntityProp> = {
  people: {
    icon: "fa-solid fa-user-large",
    title: "People",
  },
  planets: {
    icon: "fa-solid fa-earth-europe",
    title: "Planets",
  },
  vehicles: {
    icon: "fa-solid fa-motorcycle",
    title: "Vehicles",
  },
  starships: {
    icon: "fa-solid fa-shuttle-space",
    title: "Starships",
  },
  species: {
    icon: "fa-brands fa-reddit-alien",
    title: "Species",
  },
};

const SearchPage: React.FC<SearchProps> = ({ setCategoryData }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { searchResults, error, loading } = useAPI<APISearchResults>(debouncedSearchTerm);
  const searchInput = useRef<HTMLInputElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    searchInput?.current?.focus();
  }, []);

  const handleViewAllClick = (categoryName: SEARCH_TYPE) => {
    const categoryData = searchResults?.starWarsData[categoryName];
    const totalItems = searchResults?.totals[categoryName];
    if (categoryData) {
      setCategoryData({
        name: categoryName,
        totalItems,
        searchString: searchTerm,
        data: categoryData,
      });
    }
  };

  const renderSearchResults = () => {
    if (!searchResults || error) return null;

    return Object.keys(searchResults.starWarsData).map((key) => {
      const searchKey = key as SEARCH_TYPE;
      const items = searchResults.starWarsData[searchKey]?.slice(0, 3).map((resultItem) => (
        <li key={resultItem.url}>
          <i className={ENTITY_PROPS[searchKey].icon}></i>
          {resultItem.name}
        </li>
      ));

      if (items?.length) {
        return (
          <div key={key}>
            <p className={styles.sectionHeader}>{ENTITY_PROPS[searchKey].title}</p>
            <ul className={styles.resultList}>{items}</ul>
            <div>
              <Button variant="link" data-item={key} onClick={() => handleViewAllClick(searchKey)}>
                View All
              </Button>
            </div>

            <hr className={styles.horizontalLine} />
          </div>
        );
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Star Wars Search Engine</h1>
      <label htmlFor="searchInput" className={styles.srOnly}>
        Search for Star Wars data
      </label>
      <input ref={searchInput} aria-label="Search for Star Wars data" className={styles.inputField} value={searchTerm} onInput={handleSearchChange} placeholder="Search for Star Wars data..." />
      {error && (
        <p role="alert" className={styles.error}>
          Sorry, there seems to be an issue, please try again later
        </p>
      )}
      {!error && searchResults && searchTerm && (
        <section className={styles.resultContainer} aria-live="polite">
          {renderSearchResults()}
        </section>
      )}
    </div>
  );
};

export default SearchPage;
