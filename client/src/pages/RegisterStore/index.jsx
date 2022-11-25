import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { json, Link } from "react-router-dom";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import MapComp from "../../components/Map/MapComp";

import categories from "../../const/categories";

const RegisterStore = ({ setRegisterStore }) => {
  const [category, setCategory] = useState([]);

  const storePosition = useSelector((state) => state.map.coords);

  const submit = async (values) => {
    const store = {
      name: values.name,
      email: values.email,
      password: values.password,
      position: storePosition,
      categories: category.join(""),
    };
    alert(JSON.stringify(store, null, 2));
    await axios.post("/auth/register/", store);
  };

  const addCategory = (i) => {
    if (category.find((elem) => i === elem) === undefined) {
      setCategory([...category, i]);
    } else {
      setCategory(category.filter((elem) => elem !== i));
    }
  };

  return (
    <div className="auth">
      <h1>Регистрация как продавец</h1>
      <p>Для входа в маркетплейс, вам нужно зарегистрироваться как продавец</p>
      <Flex bg="gray.100" align="center" justify="center">
        <Box bg="white" p={6} rounded="md" w="400px" boxShadow="lg">
          <Formik
            initialValues={{
              email: "",
              name: "",
              position: storePosition,
              password: "",
            }}
            onSubmit={submit}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field as={Input} id="email" name="email" type="email" />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Имя</FormLabel>
                    <Field as={Input} id="name" name="name" type="text" />
                  </FormControl>
                  <Popup
                    popupClass={"popup-content"}
                    trigger={
                      <Button
                        colorScheme={
                          storePosition.lat !== null ? "green" : "gray"
                        }
                        width="full"
                      >
                        {storePosition.lat !== null
                          ? "Выбрано"
                          : "Выбрать на карте"}
                      </Button>
                    }
                  >
                    <MapComp />
                    <p></p>
                  </Popup>
                  <ul className="register-categories">
                    <FormLabel>
                      Выберите категории: <br />
                    </FormLabel>
                    {categories.map((item, i) => (
                      <li
                        key={i}
                        onClick={() => addCategory(i)}
                        className={
                          Boolean(category.find((elem) => i === elem))
                            ? "active"
                            : ""
                        }
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Пароль</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      validate={(value) => {
                        let error;

                        if (value.length < 5) {
                          error = "Пароль должен содержать минимум 6 символов";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Button type="submit" colorScheme="purple" width="full">
                    Регистрация
                  </Button>
                  <div className="auth__bottom">
                    <div>Есть аккаунт?</div>
                    <Link to="/login" style={{ margin: "0 0 0 40px" }}>
                      <Button colorScheme="gray" width="full">
                        Войти
                      </Button>
                    </Link>
                  </div>
                  <Button
                    colorScheme="red"
                    width="full"
                    onClick={() => setRegisterStore(false)}
                  >
                    Регистрация покупателя
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
    </div>
  );
};

export default RegisterStore;
