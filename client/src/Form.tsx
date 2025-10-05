import React from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { error } from "console";

type FormData = {
    name: string;
    email: string;
};

const Form: React.FC = () => {
    const { register, handleSubmit, formState: { errors} } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/form', data);
            alert(response.data.message);
            // console.log(response.data)
        } catch (error: any) {
            alert(error.response?.data?.message || 'Error submitting form');
        }
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Name: </label>
                <input {...register("name", {required: true})} />
                {errors.name && <span>Name is required</span>}
            </div>

            <div>
                <label>Email: </label>
                <input {
                    ...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i
                    })
                }/>
                {errors.email && <span>Valid email is required</span>}
            </div>

            <button type="submit">Submit</button>
        </form>

    )

};

export default Form;
