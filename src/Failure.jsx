function Failure() {
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
          color: "red",
          fontSize: "55px",
        }}
      >
        ❌ PAGAMENTO RECUSADO
      </h1>

      <p
        style={{
          marginTop: "20px",
          fontSize: "22px",
        }}
      >
        Tente novamente
      </p>
    </div>
  );
}

export default Failure;