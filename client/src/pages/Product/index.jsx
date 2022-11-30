import React from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../app/slices/getProducts";
import { userId } from "../../app/slices/authSlice";

const ProductPage = () => {
  const id = useParams().id - 1;
  const uId = useSelector(userId);
  const products = useSelector(getProducts);

  const toFavourite = async () => {
    try {
      const res = await axios.post("/auth/favourites", {
        user: uId,
        good: id,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-page">
      <Image h={500} src={products[id].image} alt="image" />
      <div className="product-page__content">
        <h1>{products[id].name}</h1>
        <p>{products[id].description}</p>
        <ButtonGroup spacing="2">
          <a href={products[id].link}>
            <Button variant="solid" colorScheme="blue">
              Купить
            </Button>
          </a>
          <Button variant="ghost" colorScheme="blue" onClick={toFavourite}>
            Добавить в корзину
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ProductPage;
