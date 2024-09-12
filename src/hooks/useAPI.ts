import { useEffect, useState } from "react";
import { SearchAPI } from "../services/swapiService";
import { SEARCH_TYPE } from "../consts/dataTypes";

interface APIResponse<T> {
  loading: boolean;
  error: string | null;
  searchResults: T | null;  
} 

function useAPI<T>(searchString: string, entityType?: SEARCH_TYPE, page: number = 1, skipAPI: boolean = false): APIResponse<T> {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<T | null>(null);
 
  useEffect(() => {
    if (searchString && !skipAPI) {
      const retchData = async () => { 
        setLoading(true);
        setError(null);

        try { 
          let result: T;
          if (entityType) {
            result = await SearchAPI.fetchCategoryResults(searchString, entityType, page);
          } else {
            result = (await SearchAPI.searchAllCategories(searchString)) as T;
          }

          setSearchResults(result);
        } catch (error: any) {
          if (error instanceof Error) {
            setError(error.message);
            console.error(`Error occurred: ${error.message}`);
          } else {
            console.error("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      };
      retchData();
    }
  }, [searchString, page, entityType]);

  return { searchResults, loading, error };
}

export default useAPI;
