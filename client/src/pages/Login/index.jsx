import React from "react";
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

const Login = () => {
  const navigate = useNavigate();

  // если юзер зашел с remember me
  if (localStorage.getItem("isSigned") === "true") {
    return <Navigate to="/main" />;
  }

  const submit = async (values) => {
    const user = { email: values.email, password: values.password };
    // const res = await axios.post("http://localhost:3001/auth/login", user);
    // if (res.data.message === "User is not found!") {
    //   toast.warn("User is not found!", {
    //     position: "top-right",
    //     autoClose: 5000,
    //   });
    // } else {
    //   navigate("/main");
    //   if (values.rememberMe) {
    //     localStorage.setItem("isSigned", "true");
    //   }
    // }
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
              rememberMe: false,
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

                  <Field
                    as={Checkbox}
                    id="rememberMe"
                    name="rememberMe"
                    colorScheme="purple"
                  >
                    Remember me?
                  </Field>

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
