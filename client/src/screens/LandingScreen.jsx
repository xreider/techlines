import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { GiTechnoHeart } from 'react-icons/gi';
import { Link as ReactLink } from 'react-router-dom';

const LandingScreen = () => {
  return (
    <Box maxW="8x1" mx="auto" px={{ base: 0, lg: 12 }} py={{ base: '0', lg: '12' }} minH="6x1">
      <Stack direction={{ base: 'column-reverse', lg: 'row' }} spacing={{ base: '0', lg: '20' }}>
        <Box
          width={{ lg: 'sm' }}
          transform={{ base: 'translateY(-50%)', lg: 'none' }}
          bg={{ base: useColorModeValue('orange.50', 'gray.700'), lg: 'transparent' }}
          mx={{ base: '6', md: '8', lg: '0' }}
          px={{ base: '6', md: '8', lg: '0' }}
          py={{ base: '6', md: '8', lg: '12' }}>
          <Stack spacing={{ base: '8', lg: '10' }}>
            <Stack spacing={{ base: '2', lg: '4' }}>
              <Flex alignItems="center">
                <Icon as={GiTechnoHeart} h={12} w={12} color={useColorModeValue('orange.500', 'orange.300')} />
                <Text fontSize="4xl" fontWeight="bold" color={useColorModeValue('orange.500', 'orange.300')}>
                  Techlines
                </Text>
              </Flex>
              <Heading size="md" fontWeight="normal">
                Refresh your equipment
              </Heading>
            </Stack>
            <HStack spacing="3">
              <Link
                as={ReactLink}
                to="/products"
                color={useColorModeValue('orange.500', 'orange.300')}
                fontWeight="bold"
                fontSize="lg">
                Discover
              </Link>
              <Icon color={useColorModeValue('orange.500', 'orange.300')} as={FaArrowRight} />
            </HStack>
          </Stack>
        </Box>
        <Flex flex="1" overflow="hidden">
          <Image
            src="images/landing.jpg"
            alt="Lovely Image"
            fallback={<Skeleton />}
            maxH="450px"
            minW="300px"
            objectFit="cover"
            flex="1"
          />
        </Flex>
      </Stack>
    </Box>
  );
};

export default LandingScreen;
