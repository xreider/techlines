import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  Spinner,
  Wrap,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  WrapItem,
  Center,
  Heading,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import CartOrderSummary from '../components/CartOrderSummary';

function CartScreen() {
  const linkColor = useColorModeValue('orange.500', 'orange.200');
  const cartInfo = useSelector((state) => state.cart);
  const { loading, error, cart } = cartInfo;
  console.log('cart', cart);

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction="row" spacing={4} speed="0.65s" thickness="2px" color="orange.500">
          <Spinner mt={20} thickness />
        </Stack>
      ) : null}

      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Sorry</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {!cart || cart?.length <= 0 ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Your cart is empty</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to="/products">
              Go to Products
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: '3x1', lg: '7xl' }}
          mx="auto"
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}>
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}
            spacing={{ base: '8', md: '16' }}>
            <Stack spacing={{ base: '8', md: '10' }} flex="2">
              <Heading fontSize="2xl" fontWeight="extrabold">
                Shopping Cart
              </Heading>
              <Stack spacing="6">
                {cart.map((cartItem) => {
                  return <CartItem key={cartItem.id} cartItem={cartItem} />;
                })}
              </Stack>
            </Stack>
            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary />
              <HStack mt="6" fontWeight="semibold">
                <p>or</p>
                <Link as={ReactLink} to="/products" color={linkColor}>
                  Continue Shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
}

export default CartScreen;
