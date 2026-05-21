function Navbar({
  cart,
  setOpenCart,
}) {
  return (
    <header className="navbar">
      <div className="logo">
        AGX IMPORTS
      </div>

      <nav>
        <a href="#">
          Início
        </a>

        <a href="#">
          Produtos
        </a>

        <a href="#">
          Sobre
        </a>
      </nav>

      <div
        className="cart-icon"
        onClick={() =>
          setOpenCart(true)
        }
      >
        🛒

        <span>
          {cart.length}
        </span>
      </div>
    </header>
  );
}

export default Navbar;