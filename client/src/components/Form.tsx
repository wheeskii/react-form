import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Form.css'

type FormData = {
  name: string;
  email: string;
  birthdate: string;
  phoneNumber: string;
};

export const UserForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/users/${id}`)
        .then(res => reset(res.data))
        .catch(err => alert('User not found'));
    }
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (id) {
        await axios.put(`http://localhost:8000/api/users/${id}`, data);
        alert("User updated!");
      } else {
        await axios.post("http://localhost:8000/api/users", data);
        alert("User created!");
      }
      navigate("/users");
    } catch (err: any) {
      alert("Error submitting form");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2>{id ? 'Edit User' : 'Create User'}</h2>

      <div className="entry">
        <label>Name</label>
        {errors.name && <p>{errors.name.message}</p>}
      </div>
        <input {...register("name", { required: "Name is required" })} />

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

      <button type="submit">{id ? 'Update' : 'Create'} User</button>
    </form>
  );
};
