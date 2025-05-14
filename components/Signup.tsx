"use client";

import Link from "next/link";
import { useState } from "react";

export default function CreatPage() {
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
        <div style={{ width: "100%" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              color: "#2563ea",
              textAlign: "center",
            }}
          >
            SIGN UP
          </h2>
        </div>

        {/* <button
          style={{
            backgroundColor: "blue",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            textAlign: "center",

            border: "none",
            color: "#fff",
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          Register
        </button> */}
      </div>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="name"
            placeholder="Enter Your Name"
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

        {/* <div
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
        </div> */}

        <Link href="/Signin" passHref legacyBehavior>
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
        </Link>
        <Link href="/Signup" passHref legacyBehavior>
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
            SIGN UP
          </button>
        </Link>
      </form>
    </div>
  );
}
