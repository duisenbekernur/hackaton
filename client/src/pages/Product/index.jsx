import React from "react";
import { Link } from "react-router-dom";
import { Button, CardFooter, ButtonGroup } from "@chakra-ui/react";

const ProductPage = ({ title, content, address }) => {
  return (
    <div className="product-page">
      <img
        src="https://object.pscloud.io/cms/cms/Photo/img_0_77_3349_0_1.webp"
        alt=""
      />
      <div className="product-page__content">
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
          repellendus provident debitis cupiditate ad, odit quaerat eos
          molestiae amet sed doloremque unde quam! Labore laborum veritatis
          rerum minima nemo quos, minus officia, architecto autem quae tenetur
          pariatur consequuntur animi odit ipsa aliquam molestiae a quidem? Vero
          ea quidem perferendis dolor nam totam repudiandae! Magni, eos. Placeat
          labore odio illo repudiandae est nisi mollitia, ex, architecto quo
          unde voluptates quasi debitis numquam, adipisci perferendis pariatur
          quidem consectetur quos? Officia consequuntur ipsam a magnam incidunt
          iusto, nam quia quibusdam quam, consequatur ipsum. Provident est
          iusto, facilis quidem dolore expedita itaque consectetur aut?
        </p>
        <ButtonGroup spacing="2">
          <a href={address}>
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
