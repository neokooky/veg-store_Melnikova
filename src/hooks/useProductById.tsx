import { useEffect, useState } from "react";

export const useProductById = (id: number) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json "
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return products.find((product) => product.id === id);
};
