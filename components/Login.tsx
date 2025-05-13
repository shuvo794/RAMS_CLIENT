"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle authentication here
    //   router.push('/dashboard');
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#1e293b",
          }}
        >
          Login
        </h2>
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#4361ee",
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            placeholder="Enter Email/Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid #e2e8f0",
              marginBottom: "1rem",
              fontSize: "0.875rem",
              transition: "border-color 0.2s ease",
            }}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid #e2e8f0",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              transition: "border-color 0.2s ease",
            }}
            required
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1.5rem",
          }}
        >
          <button
            type="button"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#4361ee",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#4361ee",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "0.875rem",
            fontWeight: "500",
            cursor: "pointer",
            marginBottom: "1rem",
            transition: "background-color 0.2s ease",
          }}
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
}
