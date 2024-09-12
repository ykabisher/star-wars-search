import React, { useState, useEffect } from "react";
import styles from "./SearchResults.module.css";
import { APISearchResults, ENTITY_PROPS, SEARCH_TYPE } from "../consts/dataTypes";
import { highlightSearchTerm } from "../utils/text";
import Button from "../components/Button/Button";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";

interface SearchResultsProps {
  searchResults: APISearchResults | null;
  searchTerm: string;
  handleViewAllClick: (categoryName: SEARCH_TYPE) => void;
  error: string | null;
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, searchTerm, handleViewAllClick, error, isLoading }) => {
  if (isLoading) {
    return (
      <div>
        <SkeletonLoader />
      </div>
    );
  }

  if (!searchResults || error) return null;

  return (
    <>
      {Object.keys(searchResults.starWarsData).map((key) => {
        const searchKey = key as SEARCH_TYPE;
        const items = searchResults.starWarsData[searchKey]?.slice(0, 3) || [];

        if (items.length > 0) {
          return (
            <div key={key}>
              <p className={styles.sectionHeader}>{ENTITY_PROPS[searchKey].title}</p>
              <ul className={styles.resultList}>
                {items.map((resultItem) => (
                  <li key={resultItem.url}>
                    <i className={ENTITY_PROPS[searchKey].icon}></i>
                    <span>{highlightSearchTerm(resultItem.name, searchTerm)}</span>
                  </li>
                ))}
              </ul>
              <div>
                <Button variant="link" data-item={key} onClick={() => handleViewAllClick(searchKey)}>
                  View All
                </Button>
              </div>
              <hr className={styles.horizontalLine} />
            </div>
          );
        }

        return null;
      })}
    </>
  );
};

export default SearchResults;
