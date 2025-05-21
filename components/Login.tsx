"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LOGIN } from "@/lib/config";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Submitting data:", data);

    try {
      const response = await fetch(LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API validation errors:", errorData);
        return;
      }

      const result = await response.json();

      // Log and store token
      console.log("Login successful", result);
      if (result.access) {
        localStorage.setItem("token", result.access);
        console.log("Token stored:", localStorage.getItem("token"));
      } else {
        console.warn("No token received in login response");
      }

      if (result.first_name) {
        localStorage.setItem("userName", result.first_name);
      }

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          color: "#2563ea",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <input
          type="email"
          placeholder="Enter Email/Username"
          {...register("email", { required: true })}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #e2e8f0",
            marginBottom: "1rem",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          {...register("password", { required: true })}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #e2e8f0",
            marginBottom: "1rem",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#2563ea",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          SIGN IN
        </button>

        <button
          type="button"
          onClick={() => router.push("/Signup")}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#2563ea",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
}
