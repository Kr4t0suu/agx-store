import {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext =
  createContext();

export function CartProvider({
  children,
}) {
  const [cart, setCart] =
    useState([]);

  function addToCart(produto) {
    setCart((prevCart) => {
      const produtoExiste =
        prevCart.find(
          (item) =>
            item.id === produto.id
        );

      if (produtoExiste) {
        return prevCart.map(
          (item) => {
            if (
              item.id === produto.id
            ) {
              return {
                ...item,
                quantidade:
                  (Number(
                    item.quantidade
                  ) || 1) + 1,
              };
            }

            return item;
          }
        );
      }

      return [
        ...prevCart,
        {
          ...produto,
          preco:
            Number(
              produto.preco
            ) || 0,
          quantidade: 1,
        },
      ];
    });
  }

  function removeFromCart(id) {
    setCart((prevCart) => {
      const produtoExiste =
        prevCart.find(
          (item) => item.id === id
        );

      if (!produtoExiste)
        return prevCart;

      if (
        produtoExiste.quantidade > 1
      ) {
        return prevCart.map(
          (item) => {
            if (item.id === id) {
              return {
                ...item,
                quantidade:
                  item.quantidade -
                  1,
              };
            }

            return item;
          }
        );
      }

      return prevCart.filter(
        (item) => item.id !== id
      );
    });
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(
    CartContext
  );
}