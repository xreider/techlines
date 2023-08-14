import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link as ReactLink, useLocation } from 'react-router-dom';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  HStack,
  Heading,
  Stack,
  Text,
  Toast,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import PasswordTextField from '../components/PasswordTextField';
import TextField from '../components/TextField';
import { login } from '../redux/actions/userActions';

// TODO: Redefine password length
const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = '/products';
  const toast = useToast();

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
        description: 'Login successfull',
        status: 'success',
        isClosable: true,
      });
    }
  }, [userInfo, redirect, location.state, navigate, toast]);

  // useEffect(() => {
  //   if (error)
  //     toast({
  //       description: error,
  //       status: 'error',
  //       isClosable: true,
  //     });
  // }, [error]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'A password must contain 6 to 28 characters.')
          .max(28, 'A password must contain 6 to 28 characters.')
          .required('Password is required'),
      })}
      onSubmit={(values) => {
        dispatch(login(values.email, values.password));
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
                <Heading size={headingBreakPoint}>
                  Login in to your account
                </Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Don't have an account?</Text>
                  <Button
                    as={ReactLink}
                    to="/registration"
                    variant="link"
                    colorScheme="orange">
                    Sing up
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
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button
                    colorScheme="orange"
                    size="lg"
                    fontSize="md"
                    isLoading={loading}
                    type="submit">
                    Log in
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

export default LoginScreen;
