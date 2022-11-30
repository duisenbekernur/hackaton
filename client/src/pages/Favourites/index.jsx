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
  const [favouritesOfUser, setFavouritesOfUser] = useState([]);

  const id = useSelector(userId);

  useEffect(() => {
    function fetchDatas() {
      async function fetchFavourites() {
        const res = await axios.get("/auth/favourites/");
        console.log(res.data)
        setFavourites(res.data);
      }
      function fetchFavouritesOfUser() {
        favourites.forEach(async (obj) => {
          if (obj.user === id) {
            const { data } = await axios.get(`/products/good/${obj.good}/`);
            setFavouritesOfUser([...favouritesOfUser, data]);
          }
          console.log("favs", favouritesOfUser);
        });
      }
      fetchFavourites();
      fetchFavouritesOfUser();
    }
    fetchDatas();
  }, []);

  return (
    <div>
      <h1 style={{ margin: "30px 0 ", fontSize: "30px", fontWeight: "500" }}>
        Любимые товары
      </h1>
      <div className="products-block">
        {/* view products */}
        {favouritesOfUser.map((obj, i) => (
          <ProductCard key={i} {...obj} />
        ))}
      </div>
      <Pagination onChangePagination={(page) => setCurrentPage(page)} />
    </div>
  );
};

export default Favourites;
