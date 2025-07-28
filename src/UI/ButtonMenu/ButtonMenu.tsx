import { Button, Text, Popover, Image, Group } from "@mantine/core";
import styles from "./ButtonMenu.module.scss";

import cart from "../../assets/cart.svg";
import cartEmpty from "../../assets/cart_empty.png";

import { MiniCard } from "../../components/MiniCard/MiniCard";
import { type Product } from "../../pages/Store/Store";

type Props = {
  cartQuantity: number;
  cartItems: { [key: number]: number };
  onUpdateQuantity: (id: number, quantity: number) => void;
  products: Product[];
};

export const ButtonMenu = ({
  cartQuantity,
  cartItems,
  onUpdateQuantity,
  products,
}: Props) => {
  const totalPrice = Object.entries(cartItems).reduce((sum, [id, quantity]) => {
    const product = products.find((p) => p.id === Number(id));
    return sum + (product?.price || 0) * quantity;
  }, 0);

  return (
    <Popover
      width={Object.keys(cartItems).length === 0 ? 300 : 444}
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <Button
          variant="filled"
          color="rgba(84, 180, 106)"
          w={Object.keys(cartItems).length === 0 ? 144 : 174}
          h={44}
        >
          {Object.keys(cartItems).length !== 0 && (
            <span
              className={styles["cart-quantity"]}
              data-testid="quantity-in-cart"
            >
              {cartQuantity}
            </span>
          )}
          Cart
          <img className={styles["cart-image"]} src={cart} alt="" />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        {Object.keys(cartItems).length === 0 ? (
          <Group className={styles["empty-cart"]}>
            <Image src={cartEmpty} w={118} mb={24} />
            <Text size="sm">Your cart is empty!</Text>
          </Group>
        ) : (
          Object.entries(cartItems).map(([id, quantity]) => (
            <MiniCard
              key={id}
              id={Number(id)}
              quantity={quantity}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))
        )}
        {Object.keys(cartItems).length !== 0 && (
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Total:</span> <span>$ {totalPrice}</span>
          </Text>
        )}
      </Popover.Dropdown>
    </Popover>
  );
};
