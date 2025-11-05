import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type { UserType } from "../validator/user.validator";
import { createUser, getUserByID, updateUserByID } from "../api/fetch.api";
import { useEffect } from "react";
import '../styles/Form.style.css'


export const UserForm = () => {
    const {register, handleSubmit, reset, formState: { errors }, } = useForm<UserType>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const onSubmit = async (data: UserType) => {
        try {
            console.log(data);
            if(id) {
                await updateUserByID(id, data);
                alert("User updated!");
            } else {
                await createUser(data)
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
                <input type="text" {...register("lastName")} placeholder="Last Name"/>
            </div>

            <div className="entry">
                <label>First Name</label>
                {errors.lastName && <p>{errors.lastName.message}</p>}
                <input type="text" {...register("firstName")} placeholder="First Name"/>
            </div>

            <div className="entry">
                <label>Middle Name</label>
                {errors.lastName && <p>{errors.lastName.message}</p>}
                <input type="text" {...register("middleName")} placeholder="Middle Name"/>
            </div>

            <div className="entry">
                <label>Email</label>
                {errors.email && <p>{errors.email.message}</p>}
                <input type="email" {...register("email")} placeholder="Email" />
            </div>

            <div className="entry">
                <label>Birthdate</label>
                {errors.birthdate && <p>{errors.birthdate.message}</p>}
                <input type="date" {...register("birthdate")} />
            </div>

            <div className="entry">
                <label>Contact Number</label>
                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                <input type="tel" {...register("phoneNumber")} placeholder="Contact number"/>
            </div>

            <div className="entry">
                <label>Course</label>
                {/* {errors.course && <p>{errors.course.message}</p>} */}
                <select id="courses"{...register("course")} >
                    <option value="Information Technology">Information Technology</option>
                    <option value="Computer Science">Computer Science</option>
                </select> 
            </div>

            <button type="submit">{id ? 'Update' : 'Create'} User</button>

        </form>
    )
}