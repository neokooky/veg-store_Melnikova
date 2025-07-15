import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../../App";
import { expect, it, describe, beforeEach } from "vitest";
import { MantineProvider } from "@mantine/core";
import "@testing-library/jest-dom";

describe("App component", function () {
  beforeEach(async () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
  });

  it("renders Catalog title", async () => {
    expect(await screen.findByText(/Catalog/i)).toBeInTheDocument(); //Проверяем title
  });

  it("renders cart button", async () => {
    const header = await screen.findByRole("banner");
    const headerWithin = within(header);

    const cartButton = headerWithin.getByText(/cart/i);
    expect(cartButton).toBeInTheDocument(); //Проверяем отображение кнопки корзины
  });

  it("renders logo", async () => {
    const logo = await screen.findByRole("img", { name: /logotype/i });
    expect(logo).toBeInTheDocument(); //Проверяем отображение логотипа
  });

  it("renders cart elements", async () => {
    const item = await screen.findByText(/Brocolli/i);
    expect(item).toBeInTheDocument(); //Проверяем наименование первой карточки товара

    const cardContainer = item.closest(".card");
    const cardContainerWithin = within(cardContainer);

    const images = cardContainerWithin.getAllByRole("img");
    expect(images[0]).toBeInTheDocument(); //Проверяем отображение картинки в карточке

    const addToCartButton = cardContainerWithin.getByText(/Add to cart/i);
    expect(addToCartButton).toBeInTheDocument(); //Проверяем отображение кнопки добавления в корзину

    expect(cardContainerWithin.getByText(/\$ 120/i)).toBeInTheDocument(); //Проверяем отображение цены

    const minusButton = cardContainerWithin.getByAltText(/decrease/i);
    const plusButton = cardContainerWithin.getByAltText(/increase/i);
    expect(minusButton).toBeInTheDocument(); //Проверяем отображение кнопки минус
    expect(plusButton).toBeInTheDocument(); //Проверяем отображение кнопки плюс
  });

  it("changes quantity in card", async () => {
    const brocolli = await screen.findByText(/Brocolli/i);
    const card = brocolli.closest(".card");
    const cardWithin = within(card);
    const minusButton = cardWithin.getByAltText(/decrease/i);
    const plusButton = cardWithin.getByAltText(/increase/i);

    const quantity = cardWithin.getByTestId("quantity-of-product");

    expect(quantity).toHaveTextContent("1");

    fireEvent.click(plusButton);

    expect(quantity).toHaveTextContent("2");

    fireEvent.click(minusButton);

    expect(quantity).toHaveTextContent("1");
  });

  it("changes quantity in cart", async () => {
    const brocolli = await screen.findByText(/Brocolli/i);
    const card = brocolli.closest(".card");
    const cardWithin = within(card);
    const addToCartButton = cardWithin.getByText(/Add to cart/i);

    const header = await screen.findByRole("banner");
    const headerWithin = within(header);

    fireEvent.click(addToCartButton);

    const quantityInCart = headerWithin.getByTestId("quantity-in-cart");
    expect(quantityInCart).toHaveTextContent("1");

    fireEvent.click(addToCartButton);
    expect(quantityInCart).toHaveTextContent("2");
  });

  it("calculates total price correctly in cart", async () => {
    const broccoli = await screen.findByText(/Brocolli/i);
    const card = broccoli.closest(".card");
    const cardWithin = within(card);

    const plusButton = cardWithin.getByAltText(/increase/i);
    const addToCartButton = cardWithin.getByText(/Add to cart/i);

    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    fireEvent.click(addToCartButton);

    const header = await screen.findByRole("banner");
    const headerWithin = within(header);
    const cartButton = headerWithin.getByText(/cart/i);

    fireEvent.click(cartButton);

    const total = await screen.findByText(/Total/i);
    expect(total).toBeInTheDocument(); //Проверяем отображение надписи Total

    const totalPrice = await screen.findByText(/\$ 360/i);
    expect(totalPrice).toBeInTheDocument(); //Проверяем что сумма посчиталась верно
  });

  it("shows added product in cart dropdown", async () => {
    const cauliFlower = await screen.findByText(/Cauliflower/i);
    const card = cauliFlower.closest(".card");
    const cardWithin = within(card);

    const addToCartButton = cardWithin.getByText(/Add to cart/i);
    fireEvent.click(addToCartButton);

    const header = await screen.findByRole("banner");
    const headerWithin = within(header);

    const cartButton = headerWithin.getByText(/cart/i);
    fireEvent.click(cartButton);

    const productNameInCart = await screen.findByText(/Cauliflower/i);
    expect(productNameInCart).toBeInTheDocument();
  });

  it("displays empty cart message", async () => {
    const header = await screen.findByRole("banner");
    const headerWithin = within(header);

    const cartButton = headerWithin.getByText(/cart/i);
    fireEvent.click(cartButton);

    const emptyMessage = await screen.findByText(/Your cart is empty!/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it("updates item quantity in cart when clicking plus and minus", async () => {
    const broccoli = await screen.findByText(/Brocolli/i);
    const card = broccoli.closest(".card");
    const cardWithin = within(card);

    const addToCartButton = cardWithin.getByText(/Add to cart/i);
    fireEvent.click(addToCartButton);

    const header = await screen.findByRole("banner");
    const headerWithin = within(header);
    const cartButton = headerWithin.getByText(/cart/i);
    fireEvent.click(cartButton);

    const plusButton = await screen.findByAltText(/Plus/i);
    const minusButton = await screen.findByAltText(/Minus/i);
    const quantityInCart = screen.getByTestId("quantity-in-cart");
    const quantityAtMiniCard = screen.getByTestId("quantity-at-mini-card");

    expect(quantityInCart).toHaveTextContent("1");
    expect(quantityAtMiniCard).toHaveTextContent("1");

    fireEvent.click(plusButton);
    expect(quantityInCart).toHaveTextContent("2");
    expect(quantityAtMiniCard).toHaveTextContent("2");

    fireEvent.click(minusButton);
    expect(quantityInCart).toHaveTextContent("1");
    expect(quantityAtMiniCard).toHaveTextContent("1");
  });

  it("updates item quantity in cart and removes product when quantity < 1", async () => {
    const broccoli = await screen.findByText(/Brocolli/i);
    const card = broccoli.closest(".card");
    const cardWithin = within(card);

    const addToCartButton = cardWithin.getByText(/Add to cart/i);
    fireEvent.click(addToCartButton);

    const header = await screen.findByRole("banner");
    const headerWithin = within(header);
    const cartButton = headerWithin.getByText(/cart/i);

    fireEvent.click(cartButton);

    const plusButton = await screen.findByAltText(/Plus/i);
    const minusButton = await screen.findByAltText(/Minus/i);
    const quantityInCart = screen.getByTestId("quantity-in-cart");

    expect(quantityInCart).toHaveTextContent("1");

    fireEvent.click(plusButton);
    expect(quantityInCart).toHaveTextContent("2");
    fireEvent.click(minusButton);
    fireEvent.click(minusButton);

    expect(quantityInCart).not.toBeInTheDocument();

    const emptyMessage = await screen.findByText(/Your cart is empty!/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});
