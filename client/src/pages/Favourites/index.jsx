import React, { useState } from "react";

// COMPONENTS
import ProductCard from "../../components/Card";
import Categories from "../../components/Category";
import Sort from "../../components/Sort";
import Pagination from "../../components/Pagination";

const Favourites = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState(0);
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div>
      <h1 style={{'margin': '30px 0 ', 'fontSize': '30px', 'fontWeight': '500'}}>Любимые товары</h1>
      <div className="sort-block">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Sort
          setSortType={setSortType}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
        />
      </div>
      <div className="products-block">
        {/* view products */}
        {[...new Array(5)].map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>
      <Pagination onChangePagination={(page) => setCurrentPage(page)} />
    </div>
  );
};

export default Favourites;
