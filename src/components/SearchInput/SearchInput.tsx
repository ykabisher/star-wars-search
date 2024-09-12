import React, { useEffect, useRef } from "react";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, handleSearchChange }) => {
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInput?.current?.focus();
  }, []);

  return (
    <input
      ref={searchInput}
      aria-label="Search for Star Wars data"
      className={styles.inputField}
      value={searchTerm}
      onInput={handleSearchChange}
      placeholder="Search for Star Wars data..."
    /> 
  );
};

export default SearchInput;