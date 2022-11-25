import React from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";
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

const Register = ({ setRegisterStore }) => {
  const submit = async (values) => {
    const res = await axios.post(
      "/auth/signup/",
      JSON.parse(JSON.stringify(values, null, 2))
    );
  };

  return (
    <div className="auth">
      <h1>Регистрация как покупатель</h1>
      <p>
        Для входа в маркетплейс, вам нужно зарегистрироваться как покупатель
      </p>
      <Flex bg="gray.100" align="center" justify="center">
        <Box bg="white" p={6} rounded="md" w="400px" boxShadow="lg">
          <Formik
            initialValues={{
              email: "",
              name: "",
              lastname: "",
              phone: "",
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
                    <FormLabel>Имя</FormLabel>
                    <Field as={Input} id="name" name="name" type="text" />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Фамилия</FormLabel>
                    <Field
                      as={Input}
                      id="lastname"
                      name="lastname"
                      type="text"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Телефон</FormLabel>
                    <Field as={Input} id="phone" name="phone" type="text" />
                  </FormControl>
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
                    <Link to="/login">
                      <Button
                        colorScheme="gray"
                        width="full"
                        style={{ margin: "0 0 0 30px" }}
                      >
                        Войти
                      </Button>
                    </Link>
                  </div>
                  <Button
                    colorScheme="red"
                    width="full"
                    onClick={() => setRegisterStore(true)}
                  >
                    Регистрация магазина
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

export default Register;
