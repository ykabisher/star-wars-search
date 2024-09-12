import { useState } from "react";
import useAPI from "../hooks/useAPI";
import { APISearchResults, CategoryData, SEARCH_TYPE } from "../consts/dataTypes";
import styles from "./SearchPage.module.css";
import useDebounce from "../hooks/useDebounce";
import SearchInput from "../components/SearchInput/SearchInput";
import ErrorDisplay from "../components/ErrorDisplay/ErrorDisplay";
import SearchResults from "./SearchResults";

interface SearchProps {
  setCategoryData: (categoryData: CategoryData) => void;
}

const SearchPage: React.FC<SearchProps> = ({ setCategoryData }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { searchResults, error, loading } = useAPI<APISearchResults>(debouncedSearchTerm);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Star Wars Search Engine</h1>
      <SearchInput searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      {error && <ErrorDisplay error="Sorry, there seems to be an issue, please try again later" />}
      {!error && searchTerm && (
        <section className={styles.resultContainer} aria-live="polite">
          <SearchResults isLoading={loading} searchResults={searchResults} searchTerm={searchTerm} handleViewAllClick={handleViewAllClick} error={error} />
        </section>
      )}
    </div>
  );
};

export default SearchPage;