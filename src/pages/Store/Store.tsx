import { ProductsList } from "../../modules/ProductsList";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { LoaderCircle } from "../../UI/LoaderCircle/LoaderCircle";
import { Text } from "@mantine/core";

export type ProductsProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const Store = () => {
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
  const [products, setProducts] = useState<Array<ProductsProps>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json "
        );
        const data: Array<ProductsProps> = await response.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message || "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    //setTimeout(fetchProducts, 500);
    fetchProducts();
  }, []);

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
