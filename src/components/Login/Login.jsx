import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TokenContext } from "../Context/tokenContext";

export default function Login() {

  const navigate = useNavigate();
  const {token , setToken} = useContext(TokenContext);

  const initialValues = {
    email: "",
    password: "",
  };
  

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is not valid").required("Email is Required"),
    password: Yup.string().matches('^[A-Z][a-z0-9]{4,8}$',"pattern is not valid").required("password is required"),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: login
  });

  async function login(value){
    
    try{
      const {data} = await axios.post(`http://localhost:4200/api/v1/signin` , value)

      if(data?.status == 401){
        alert(data.message)
      }else{
        window.localStorage.setItem("token" , data.token);
        setToken(data.token);
        navigate("/");
      }
    } 
    catch(err){
      console.log(err);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="my-5 w-50 mx-auto">

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? <div className="alert py-2 fs-6 alert-danger mt-2">{formik.errors.email}</div> : ""}

      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password ? <div className="alert py-2 fs-6 alert-danger mt-2">{formik.errors.password}</div> : ""}
      </div>
      <button className="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  );
}
