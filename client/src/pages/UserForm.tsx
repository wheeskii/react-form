import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
// import { zodResolver } from "@hookform/resolvers/zod";
import type { UserType } from "../validator/user.validator";
import { getUserByID, updateUserByID } from "../api/fetch.api";
import { useEffect } from "react";
import '../styles/Form.style.css'


export const UserForm = () => {
    const {register, handleSubmit, reset, formState: { errors }, } = useForm<UserType>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const onSubmit = async (data: UserType) => {
        try {
            if(id) {
                await updateUserByID(id, data);
                alert("User updated!");
            } else {
                await getUserByID(id)
                alert("User created!");
            }
            navigate('/users');
            
        } catch (error) {
            alert(error);
        };
    };

    useEffect(() => {
        if (id) {
          getUserByID(id)
            .then(user => reset(user))
            .catch(() => alert('User not found'));
        }
      }, [id, reset]);
      

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <h2>{id ? 'Edit User' : 'Create User'}</h2>

            <div className="entry">
                <label>Last Name</label>
                {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>
            <input type="text" {...register("lastName")} placeholder="Last Name"/>

            <div className="entry">
                <label>First Name</label>
                {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>
            <input type="text" {...register("firstName")} placeholder="First Name"/>

            <div className="entry">
                <label>Middle Name</label>
                {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>
            <input type="text" {...register("middleName")} placeholder="Middle Name"/>

            <div className="entry">
                <label>Email</label>
                {errors.email && <p>{errors.email.message}</p>}
            </div>
                <input type="email" {...register("email", { required: "Email is required" })} />

            <div className="entry">
                <label>Birthdate</label>
                {errors.birthdate && <p>{errors.birthdate.message}</p>}
            </div>
                <input type="date" {...register("birthdate", { required: "Birthdate is required" })} />

            <div className="entry">
                <label>Phone Number</label>
                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            </div>
                <input type="tel" {...register("phoneNumber", { required: "Phone number is required" })} />

            <div className="entry">
                <label>Course</label>
                {/* {errors.course && <p>{errors.course.message}</p>} */}
            </div>
            <select id="courses"{...register("course")} >
                <option value="Information Technology">Information Technology</option>
                <option value="Computer Science">Computer Science</option>
            </select> 

            <button type="submit">{id ? 'Update' : 'Create'} User</button>

        </form>
    )
}