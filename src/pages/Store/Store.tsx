import { ProductsList } from "../../modules/ProductsList";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { LoaderCircle } from "../../UI/LoaderCircle/LoaderCircle";
import { Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/reducer";
import type { AppDispatch, RootState } from "../../store/store";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const Store = () => {
  // const [products, setProducts] = useState<Array<Product>>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});

  const handleAddToCart = (id: number, quantity: number) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + quantity,
    }));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      const newCart = { ...cartItems };
      delete newCart[id];
      setCartItems(newCart);
    } else {
      setCartItems((prev) => ({ ...prev, [id]: quantity }));
    }
  };

  const totalItems = Object.values(cartItems).reduce(
    (acc, val) => acc + val,
    0
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <LoaderCircle />;
  }

  if (error) {
    return <Text c="red">Ошибка: {error}</Text>;
  }

  return (
    <>
      <Header
        cartQuantity={totalItems}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        products={products}
      />
      <ProductsList onAddToCart={handleAddToCart} products={products} />
    </>
  );
};
