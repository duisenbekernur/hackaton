import React, { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import ProductCard from "../../components/Card";
import Categories from "../../components/Category";
import Sort from "../../components/Sort";
import Pagination from "../../components/Pagination";

// redux functions
import { fetchProducts, getProducts } from "../../app/slices/getProducts";
import { search } from "../../app/slices/searchProductSlice";

const Main = () => {
  const [limitProduct, setLimitProduct] = useState(10);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState(0);
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const searchValue = useSelector(search);

  const productsCopy = [...products];

  const sortByPrice = (arr) => {
    arr.sort((a, b) => (Number(a.price) > Number(b.price) ? 1 : -1));
  };

  const sortByRating = (arr) => {
    arr.sort((a, b) => (Number(a.rating) > Number(b.rating) ? 1 : -1));
  };

  const sortByTitle = (arr) => {
    arr.sort((a, b) => (a.name > b.name ? 1 : -1));
  };

  switch (sortType) {
    case "price": {
      sortByPrice(productsCopy);
    }
    case "rating": {
      sortByRating(productsCopy);
    }
    case "title": {
      sortByTitle(productsCopy);
    }
  }
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div>
      <div className="main-top">
        <h1 style={{ margin: "30px 0 ", fontSize: "30px", fontWeight: "500" }}>
          Все товары
        </h1>
        <div>
          <p>
            Кол-во товаров в странице:
            <Input
              onChange={(e) => {
                setLimitProduct(() => {
                  return Math.max(e.target.value, 5);
                });
              }}
              htmlSize={4}
              width="auto"
            />
          </p>
          <h1>Текущая страница: {currentPage}</h1>
        </div>
      </div>
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
        {console.log('search', searchValue)}
        {productsCopy
          .filter((product) =>
            product.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .slice((currentPage - 1) * limitProduct, currentPage * limitProduct)
          .map((product, i) => (
            <ProductCard {...product} key={i} />
          ))}
      </div>
      <Pagination
        limitProduct={limitProduct}
        currentPage={currentPage}
        onChangePagination={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Main;
