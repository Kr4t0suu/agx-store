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
    setCart((prev) => {
      const produtoExiste =
        prev.find(
          (item) =>
            item.id === produto.id
        );

      if (produtoExiste) {
        return prev.map((item) => {
          if (
            item.id === produto.id
          ) {
            return {
              ...item,
              quantidade:
                Number(
                  item.quantidade
                ) + 1,
            };
          }

          return item;
        });
      }

      return [
        ...prev,
        {
          ...produto,
          quantidade: 1,
        },
      ];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => {
      const item = prev.find(
        (p) => p.id === id
      );

      if (!item) return prev;

      if (item.quantidade > 1) {
        return prev.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              quantidade:
                p.quantidade - 1,
            };
          }

          return p;
        });
      }

      return prev.filter(
        (p) => p.id !== id
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