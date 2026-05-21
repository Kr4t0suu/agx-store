function Success() {
  return (
    <div
      style={{
        background: "#000",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      <h1
        style={{
          color: "#d4af37",
          fontSize: "55px",
        }}
      >
        ✅ PAGAMENTO APROVADO
      </h1>

      <p
        style={{
          marginTop: "20px",
          fontSize: "22px",
        }}
      >
        Obrigado por comprar na AGX IMPORTS
      </p>
    </div>
  );
}

export default Success;