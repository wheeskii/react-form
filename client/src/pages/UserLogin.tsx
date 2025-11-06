import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validator/login.validation";
import type { LoginType } from "../validator/login.validation";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authentication.api";
import '../styles/UserLogin.styles.css';

export const LoginPage = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors }, } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginType) => {
        try {
            
            // const user = await loginUser(data.email, navigate)
            const user = await loginUser(data.email)
            console.log("Logged in user:", user);
            console.log(Date());
            navigate("/users");
          } catch (error: any) {
            console.error("Login failed:", error);
            alert("Invalid email");
          }
    }

    return (
        
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                <h2 className="heading">Sign in</h2>

                {errors.email && <p className="login-validation">{errors.email.message}</p>}
                <input type="email" {...register("email")} placeholder="Email"/>
                
                <button type="submit">Sign in</button>

            </form>
        
    )
    
};
