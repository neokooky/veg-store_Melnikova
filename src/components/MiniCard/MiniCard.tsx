import { Image, Group, Text, Button } from "@mantine/core";
import minusButton from "../../assets/minus-button.svg";
import plusButton from "../../assets/plus-button.svg";
import { useProductById } from "../../hooks/useProductById";
import styles from "./MiniCard.module.scss";

type MiniCardProps = {
  id: number;
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
};

export const MiniCard = ({ id, quantity, onUpdateQuantity }: MiniCardProps) => {
  const product = useProductById(id);

  if (!product) return null;

  return (
    <Group mb={12} pb={16} w={400} className={styles["mini-card"]}>
      <Image
        src={product.image}
        alt={product.name}
        style={{ width: 64 }}
        mr={12}
      />
      <Group className={styles["mini-card--underline"]}>
        <Text truncate="end" style={{ fontSize: 18 }}>
          {product.name}
          <br />$ {product.price * quantity}
        </Text>
        <Group
          mt="md"
          mb="xs"
          style={{
            marginLeft: "auto",
            width: 90,
            gap: 9,
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="light"
            w={30}
            h={30}
            p={0}
            onClick={() => onUpdateQuantity(id, quantity - 1)}
          >
            <img src={minusButton} alt="Minus" width={30} height={30} />
          </Button>
          <span data-testid="quantity-at-mini-card">{quantity}</span>
          <Button
            variant="light"
            w={30}
            h={30}
            p={0}
            onClick={() => onUpdateQuantity(id, quantity + 1)}
          >
            <img src={plusButton} alt="Plus" width={30} height={30} />
          </Button>
        </Group>
      </Group>
    </Group>
  );
};
