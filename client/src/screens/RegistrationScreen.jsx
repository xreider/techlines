import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
  AlertIcon,
  AlertTitle,
  Alert,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link as ReactLink } from 'react-router-dom';
import { register } from '../redux/actions/userActions.js';

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();
  const redirect = '/products';

  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;

  const headingBreakPoint = useBreakpointValue({ base: 'xs', md: 'sm' });
  const boxBreakPoint = useBreakpointValue({
    base: 'transparent',
    md: 'bg-surface',
  });

  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
      toast({
        description: 'Registered successfully',
        status: 'success',
        isClosable: true,
      });
    }
  }, [userInfo, redirect, location.state, navigate, toast]);

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(1, 'A name must contain 1 to 280 characters.')
          .max(280, 'A name must contain 1 to 280 characters.')
          .required('Name is required'),
        email: Yup.string()
          .email('Invalid email')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'A password must contain 6 to 28 characters.')
          .max(28, 'A password must contain 6 to 28 characters.')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .min(6, 'A password must contain 6 to 28 characters.')
          .max(28, 'A password must contain 6 to 28 characters.')
          .required('Password is required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      })}
      onSubmit={(values) => {
        dispatch(register(values.name, values.email, values.password));
      }}>
      {(formik) => (
        <Container
          minH="4"
          maxW="lg"
          py={{ base: '12', md: '24' }}
          px={{ base: '0', md: '8' }}>
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{ base: 2, md: 3 }} textAlign="center">
                <Heading size={headingBreakPoint}>Create an account</Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Already a user?</Text>
                  <Button
                    as={ReactLink}
                    to="/login"
                    variant="link"
                    colorScheme="orange">
                    Sing in
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              px={{ base: '4', sm: '10' }}
              py={{ base: '0', sm: '8' }}
              bg={boxBreakPoint}
              boxShadow={{ base: 'none', md: 'xl' }}>
              <Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert
                    status="error"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center">
                    <AlertIcon />
                    <AlertTitle>Sorry</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing="5">
                  <FormControl>
                    <TextField
                      type="text"
                      name="name"
                      placeholder="First and Lastname"
                      label="Full name"
                    />
                    <TextField
                      type="text"
                      name="email"
                      placeholder="your@email.com"
                      label="email"
                    />
                    <PasswordTextField
                      type="password"
                      name="password"
                      placeholder="Your password"
                      label="Password"
                    />
                    <PasswordTextField
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      label="Confirm your password"
                    />
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button
                    colorScheme="orange"
                    size="lg"
                    fontSize="md"
                    isLoading={loading}
                    type="submit">
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default RegistrationScreen;
