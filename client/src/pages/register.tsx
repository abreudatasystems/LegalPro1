import React, { useState } from "react";

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%)",
  } as React.CSSProperties,
  card: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    padding: 36,
    minWidth: 340,
    maxWidth: 380,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 16,
    marginBottom: 10,
    outline: "none",
    background: "#f9fafb",
    transition: "border 0.2s",
  } as React.CSSProperties,
  button: {
    width: "100%",
    padding: "12px 0",
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    marginBottom: 8,
    transition: "background 0.2s",
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
  success: {
    color: "#16a34a",
    marginTop: 8,
    textAlign: "center" as const,
  },
};

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao cadastrar");
      setSuccess("Cadastro realizado! Faça login.");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <img src="/logo192.png" alt="LegalPro" style={styles.logo} />
        <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: 28, color: "#1e293b", marginBottom: 8, letterSpacing: 0.5 }}>Cadastro no LegalPro</h2>
        <form onSubmit={handleRegister}>
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required style={styles.input} />
          <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required style={styles.input} />
          <input type="text" placeholder="Nome" value={firstName} onChange={e => setFirstName(e.target.value)} style={styles.input} />
          <input type="text" placeholder="Sobrenome" value={lastName} onChange={e => setLastName(e.target.value)} style={styles.input} />
          <button type="submit" style={styles.button}>Cadastrar</button>
        </form>
        <a style={styles.link} href="#" onClick={() => window.location.href = "/login"}>Já tem conta? Faça login</a>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
      </div>
    </div>
  );
}
