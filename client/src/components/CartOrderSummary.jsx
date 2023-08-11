import React, { useState } from 'react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Badge, Button, Flex, Heading, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react';

const CartOrderSummary = () => {
  const [buttonLoading, setButtonLoading] = useState();
  const standartShipping = Number(4.99).toFixed(2);
  const cartItems = useSelector((state) => state.cart);
  const { subtotal } = cartItems;
  const navigate = useNavigate;

  const checkoutHandler = () => {
    setButtonLoading(true);
    navigate('/checkout');
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" w="full">
      <Heading size="md">Order Summary</Heading>
      <Stack spacing="6">
        <Flex justifyContent="space-between">
          <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
            Subtotal
          </Text>
          <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
            $ {subtotal}
          </Text>
        </Flex>

        <Flex justifyContent="space-between">
          <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
            Shipping
          </Text>
          <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
            {subtotal <= 1000 ? (
              standartShipping
            ) : (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                Free
              </Badge>
            )}
          </Text>
        </Flex>
        <Flex fontSize="xl" justifyContent="space-between" fontWeight="extrabold" color={mode('gray.600', 'gray.400')}>
          <Text>Total</Text>
          <Text>$ {subtotal <= 1000 ? Number(subtotal) + Number(standartShipping) : subtotal}</Text>
        </Flex>
      </Stack>
      <Button
        as={ReactLink}
        to="/checkout"
        colorScheme="orange"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={() => checkoutHandler()}>
        Checkout
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
