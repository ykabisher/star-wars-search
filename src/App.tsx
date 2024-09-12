import { useState } from "react";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import { CategoryData } from "./consts/dataTypes";

function App() {
  const [categoryData, setCategoryData] = useState<CategoryData>(null);

  const goBack = () => {
    setCategoryData(null);
  };

  return (
    <div>
      {!categoryData && <SearchPage setCategoryData={setCategoryData} />}
      {categoryData && <CategoryPage goBack={goBack} categoryData={categoryData} />}
    </div>
  );
}

export default App;
