import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
  Alert,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import {
  resetUpdateSuccess,
  updateProfile,
} from '../redux/actions/userActions';
import { useEffect } from 'react';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, loading, error, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({
        description: 'Profile updated successfully',
        status: 'success',
        isClosable: true,
      });
      dispatch(resetUpdateSuccess());
    }
  }, [updateSuccess, toast]);

  return userInfo ? (
    <Formik
      initialValues={{
        name: userInfo.name,
        email: userInfo.email,
        password: '',
        confirmPassword: '',
      }}
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
        dispatch(
          updateProfile(
            userInfo._id,
            values.name,
            values.email,
            values.password
          )
        );
      }}>
      {(formik) => (
        <Box
          minH="100vh"
          maxW={{ base: '3xl', lg: '7xl' }}
          mx="auto"
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}>
          <Stack
            spacing="10"
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}>
            <Stack flex="1.5" mb={{ base: '2xl', md: 'none' }}>
              <Heading fontSize="2xl" fontWeight="extrabold">
                Profile
              </Heading>
              <Stack spacing="6">
                <Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
                  {error && (
                    <Alert status="error">
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
                        placeholder="Your first and last names"
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
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Flex
              direction="column"
              align="center"
              flex="1"
              _dark={{ bg: 'gray.900' }}>
              <Card>
                <CardHeader>
                  <Heading size="md">User Report</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box pt="2" fontSize="sm">
                      Registered on{' '}
                      {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default ProfileScreen;
