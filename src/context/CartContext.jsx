import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext =
  createContext();

export function CartProvider({
  children,
}) {
  const [cart, setCart] =
    useState([]);

  useEffect(() => {
    const cartSalvo =
      localStorage.getItem(
        "agx-cart"
      );

    if (cartSalvo) {
      setCart(
        JSON.parse(cartSalvo)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "agx-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  function addToCart(produto) {
    setCart((prev) => {
      const existe =
        prev.find(
          (item) =>
            item.id === produto.id
        );

      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade:
                  item.quantidade +
                  1,
              }
            : item
        );
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
        (produto) =>
          produto.id === id
      );

      if (!item) return prev;

      if (item.quantidade === 1) {
        return prev.filter(
          (produto) =>
            produto.id !== id
        );
      }

      return prev.map((produto) =>
        produto.id === id
          ? {
              ...produto,
              quantidade:
                produto.quantidade -
                1,
            }
          : produto
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