import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validator/login.validation";
import type { LoginType } from "../validator/login.validation";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authentication.api";

export const LoginPage = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors }, } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginType) => {
        try {
            const user = await loginUser(data.email)
            console.log("Logged in user:", user);
            navigate("/users");
          } catch (error: any) {
            console.error("Login failed:", error);
            alert("Invalid email or password");
          }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <input {...register("email")} placeholder="Email"/>
            {errors.email && <p className="login-validation">{errors.email.message}</p>}

            <button type="submit">Login</button>

        </form>
    )
    
};
