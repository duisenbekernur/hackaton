import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  CardFooter,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

const ProductCard = ({ id, name, description, price, image }) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
        h={300}
          src={image }
          alt={id}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text>
            {description.length > 100
              ? description.substr(0, 100) + "..."
              : description}
          </Text>
          <Text color="blue.600" fontSize="2xl">
            {price.replace(/[^0-9]/g, '')} ₸
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Link to={`/product/${id}`}>
            <Button variant="solid" colorScheme="blue">
              Купить
            </Button>
          </Link>
          <Button variant="ghost" colorScheme="blue">
            Добавить в корзину
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
