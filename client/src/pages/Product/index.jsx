import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../app/slices/getProducts";

const ProductPage = () => {
  const id = useParams().id - 1;
  const products = useSelector(getProducts);

  return (
    <div className="product-page">
      <Image h={500} src={products[id].image} alt="image" />
      <div className="product-page__content">
        <h1>{products[id].name}</h1>
        <p>{products[id].description}</p>
        <ButtonGroup spacing="2">
          <a href={products[id].link} target="_blank">
            <Button variant="solid" colorScheme="blue">
              Купить
            </Button>
          </a>
          <Button variant="ghost" colorScheme="blue">
            Добавить в корзину
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ProductPage;
