import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "./components/InputWithLabel";
import { useEffect } from "react";

const registerSchema = z
  .object({
    email: z.string().refine(
      (value) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(value);
      },
      { message: "อีเมลไม่ถูกต้อง" }
    ),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "password not match",
    path: ["confirmPassword"],
  });

function App() {
  const onSubmit = async (data) => {
    fetch("http://localhost:5000/test", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    control,
    watch,
  } = useForm({ resolver: zodResolver(registerSchema) });

  return (
    <form
      className="flex flex-col w-full h-screen gap-2"
      style={{ backgroundColor: "rgb(53,53,53)" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="date" />
      <InputWithLabel
        label={"email"}
        form={register("email")}
        placeholder={"Your email"}
        error={errors?.email}
      />
      <InputWithLabel
        label={"password"}
        form={register("password")}
        placeholder={"Your password"}
        error={errors?.password}
      />
      <InputWithLabel
        label={"confirmPassword"}
        form={register("confirmPassword")}
        placeholder={"Your confirmPassword"}
        error={errors?.confirmPassword}
      />
      <button className="p-1 rounded-xl bg-green-400" type="submit">
        Submit
      </button>
    </form>
  );
}

export default App;