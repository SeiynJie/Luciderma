import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Will not reload webpage when form submitted
  };
  
  return (
    <form className="flex min-h-[80vh] items-center">
      <div className="m-auto flex min-w-[340px] flex-col items-start gap-3 rounded-xl border p-8 text-sm text-zinc-600 shadow-lg sm:min-w-96">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "login"} to book appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="mt-1 w-full rounded border border-zinc-300 p-2"
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="mt-1 w-full rounded border border-zinc-300 p-2"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="mt-1 w-full rounded border border-zinc-300 p-2"
          />
        </div>

        <button className="bg-primary w-full rounded-md py-2 text-base text-white">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer underline"
              onClick={() => setState("Login")}
            >
              Login here
            </span>{" "}
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              className="text-primary cursor-pointer underline"
              onClick={() => setState("Sign Up")}
            >
              Click here
            </span>{" "}
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
