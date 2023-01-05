import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";

// import redux function
import { fetchAuth } from "../../app/slices/authSlice";
import { selectIsLogged } from "../../app/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLogged);

  const submit = async (values) => {
    const user = { email: values.email, password: values.password };

    // check user login datas
    const data = await dispatch(fetchAuth(user));

    if (!data.payload) {
      return alert("Не удалось авторизоваться!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", `Token ${data.payload.token}`);
      window.localStorage.setItem("username");
    }
  };

  return (
    <div className="auth">
      <h1>Войти</h1>
      <p>Пожалуйста, войдите в свой аккаунт</p>
      <Flex bg="gray.100" align="center" justify="center">
        <Box bg="white" p={6} rounded="md" w="400px" boxShadow="lg">
          <Formik
            initialValues={{
              email: "",
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
                          error = "Password must contain at least 6 characters";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <Button type="submit" colorScheme="purple" width="full">
                    Войти
                  </Button>
                  <div className="auth__bottom">
                    <p>Нету аккаунта? </p>
                    <Link to="/register">
                      <Button
                        colorScheme="gray"
                        width="full"
                        style={{ margin: "0 0 0 55px" }}
                      >
                        Регистрация
                      </Button>
                    </Link>
                  </div>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
      <ToastContainer />

    </div>
  );
};

export default Login;
