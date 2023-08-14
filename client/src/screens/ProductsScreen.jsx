import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Spinner,
  Stack,
  Wrap,
  WrapItem,
  Toast,
} from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { useEffect } from 'react';

function ProductsScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack
          direction="row"
          spacing={4}
          speed="0.65s"
          thickness="2px"
          color="orange.500">
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

      {products?.map?.((product) => (
        <WrapItem key={product._id}>
          <Center w="250px" h="550px">
            <ProductCard product={product} />
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );
}

export default ProductsScreen;
