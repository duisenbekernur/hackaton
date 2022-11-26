import React, { useState, useEffect } from "react";

import { userId } from "../../app/slices/authSlice";
import { useSelector } from "react-redux";

// COMPONENTS
import ProductCard from "../../components/Card";
import Categories from "../../components/Category";
import Sort from "../../components/Sort";
import Pagination from "../../components/Pagination";
import axios from "../../axios";

const Favourites = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [favourites, setFavourites] = useState([]);

  const id = useSelector(userId);

  useEffect(() => {
    async function fetchFavourites() {
      try {
        const res = await axios.get("/auth/favourites/");
        console.log(res.data);
        setFavourites(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFavourites();
  }, []);

  return (
    <div>
      <h1 style={{ margin: "30px 0 ", fontSize: "30px", fontWeight: "500" }}>
        Любимые товары
      </h1>
      <div className="products-block">
        {/* view products */}
        {favourites.map(async (obj, i) => {
          if (obj.user === id) {
            const { data } = await axios.get(`/products/good/${obj.good}/`);
            console.log(data);
            return <ProductCard key={i} />;
          }
        })}
      </div>
      <Pagination onChangePagination={(page) => setCurrentPage(page)} />
    </div>
  );
};

export default Favourites;
