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
    const produtoExiste = cart.find(
      (item) =>
        item.id === produto.id
    );

    if (produtoExiste) {
      const novoCarrinho =
        cart.map((item) => {
          if (
            item.id === produto.id
          ) {
            return {
              ...item,
              quantidade:
                (item.quantidade ||
                  1) + 1,
            };
          }

          return item;
        });

      setCart(novoCarrinho);
    } else {
      setCart([
        ...cart,
        {
          ...produto,
          quantidade: 1,
        },
      ]);
    }
  }

  function removeFromCart(id) {
    const produtoExiste = cart.find(
      (item) => item.id === id
    );

    if (!produtoExiste) return;

    if (
      produtoExiste.quantidade > 1
    ) {
      const novoCarrinho =
        cart.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantidade:
                item.quantidade - 1,
            };
          }

          return item;
        });

      setCart(novoCarrinho);
    } else {
      setCart(
        cart.filter(
          (item) => item.id !== id
        )
      );
    }
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
  return useContext(CartContext);
}