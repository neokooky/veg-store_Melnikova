import { ButtonMenu } from "../../UI/ButtonMenu/ButtonMenu";
import Logo from "../../assets/logo.svg?react";
import { AppShell } from "@mantine/core";
import styles from "./Header.module.scss";
import { type ProductsProps } from "../../pages/Store/Store";

type HeaderProps = {
  cartQuantity: number;
  cartItems: { [key: number]: number };
  onUpdateQuantity: (id: number, quantity: number) => void;
  products: ProductsProps[];
};

export const Header = ({
  cartQuantity,
  cartItems,
  onUpdateQuantity,
  products,
}: HeaderProps) => {
  return (
    <AppShell header={{ height: 60 }} padding="md" mb={120}>
      <AppShell.Header className={styles.header}>
        <span role="img" aria-label="logotype">
          <Logo />
        </span>
        <ButtonMenu
          cartQuantity={cartQuantity}
          cartItems={cartItems}
          onUpdateQuantity={onUpdateQuantity}
          products={products}
        />
      </AppShell.Header>
    </AppShell>
  );
};
