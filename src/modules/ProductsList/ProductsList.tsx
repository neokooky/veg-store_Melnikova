import { useState } from "react";
import { Card, Image, Text, Button, Group, SimpleGrid } from "@mantine/core";
import styles from "./ProductsList.module.scss";
import cartGreen from "../../assets/cart-green.svg";
import minusButton from "../../assets/minus-button.svg";
import plusButton from "../../assets/plus-button.svg";
import type { ProductsProps } from "../../pages/Store/Store";

type ProductsListProps = {
  products: ProductsProps[];
  onAddToCart: (id: number, quantity: number) => void;
};

export const ProductsList = ({ onAddToCart, products }: ProductsListProps) => {
  const [amount, setAmount] = useState<{ [key: number]: number }>({});

  const handleClickPlus = (id: number) => {
    setAmount((prev) => {
      return { ...prev, [id]: (prev[id] || 1) + 1 };
    });
  };

  const handleClickMinus = (id: number) => {
    setAmount((prev) => {
      return { ...prev, [id]: (prev[id] || 1) - 1 };
    });
  };

  return (
    <div className={styles["products-list"]}>
      <h1 className={styles["catalog-title"]}>Catalog</h1>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }} spacing={24}>
        {products.map((product) => {
          return (
            <>
              <Card
                shadow="sm"
                padding={16}
                radius="md"
                withBorder
                w={302}
                className="card"
              >
                <Card.Section>
                  <Image src={product.image} height={276} alt={product.name} />
                </Card.Section>
                <Group justify="space-between" mt={16} mb={16}>
                  <Text fw={500}>{product.name}</Text>
                  <Group
                    justify="space-between"
                    mt="md"
                    mb="xs"
                    w={90}
                    gap={9}
                    className="quantity"
                  >
                    <Button
                      variant="light"
                      w={30}
                      h={30}
                      p={0}
                      onClick={() => handleClickMinus(product.id)}
                    >
                      <img
                        src={minusButton}
                        alt="Decrease quantity"
                        width={30}
                        height={30}
                      />
                    </Button>
                    <span data-testid="quantity-of-product">
                      {amount[product.id] || 1}
                    </span>
                    <Button
                      variant="light"
                      w={30}
                      h={30}
                      p={0}
                      onClick={() => handleClickPlus(product.id)}
                    >
                      <img
                        src={plusButton}
                        alt="Increase quantity"
                        width={30}
                        height={30}
                      />
                    </Button>
                  </Group>
                </Group>
                <Group justify="space-between">
                  <Text fw={600} fz={20}>
                    $ {product.price}
                  </Text>
                  <Button
                    w={200}
                    variant="light"
                    color="rgba(59, 148, 78)"
                    onClick={() =>
                      onAddToCart(product.id, amount[product.id] || 1)
                    }
                  >
                    Add to cart
                    <img src={cartGreen} alt="" />
                  </Button>
                </Group>
              </Card>
            </>
          );
        })}
      </SimpleGrid>
    </div>
  );
};
