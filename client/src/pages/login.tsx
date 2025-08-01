import React, { useState } from "react";

const styles = {
  logo: {
    width: 56,
    height: 56,
    margin: "0 auto 12px auto",
    display: "block",
    borderRadius: 12,
    boxShadow: "0 2px 8px #2563eb22",
  } as React.CSSProperties,
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%)",
  } as React.CSSProperties,
  card: {
    background: "rgba(255,255,255,0.98)",
    borderRadius: 18,
    boxShadow: "0 8px 32px rgba(37,99,235,0.10)",
    padding: 40,
    minWidth: 340,
    maxWidth: 400,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    border: "1.5px solid #e0e7ef",
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1.5px solid #d1d5db",
    fontSize: 16,
    marginBottom: 12,
    outline: "none",
    background: "#f9fafb",
    transition: "border 0.2s, box-shadow 0.2s",
    boxShadow: "0 1px 2px #2563eb11",
  } as React.CSSProperties,
  button: {
    width: "100%",
    padding: "13px 0",
    borderRadius: 8,
    border: "none",
    background: "linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 17,
    cursor: "pointer",
    marginBottom: 8,
    boxShadow: "0 2px 8px #2563eb22",
    letterSpacing: 0.5,
    transition: "background 0.2s, box-shadow 0.2s",
  } as React.CSSProperties,
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontSize: 15,
    marginTop: 4,
    textAlign: "center" as const,
    display: "block",
  },
  error: {
    color: "#dc2626",
    marginTop: 8,
    textAlign: "center" as const,
  },
};

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao logar");
      localStorage.setItem("token", data.token);
      onLogin();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <img src="/logo192.png" alt="LegalPro" style={styles.logo} />
        <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: 28, color: "#1e293b", marginBottom: 8, letterSpacing: 0.5 }}>Entrar no LegalPro</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required style={styles.input} />
          <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required style={styles.input} />
          <button type="submit" style={styles.button}>Entrar</button>
        </form>
        <a style={styles.link} href="#" onClick={() => window.location.href = "/register"}>Não tem conta? Cadastre-se</a>
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
}
