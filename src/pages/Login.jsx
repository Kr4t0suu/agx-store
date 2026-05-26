function Login() {
  return (
    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#111",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            fontSize: "40px",
          }}
        >
          Login Admin
        </h1>

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "none",
            background: "#222",
            color: "#fff",
          }}
        />

        <input
          type="password"
          placeholder="Senha"
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            background: "#222",
            color: "#fff",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background: "#00ff88",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;