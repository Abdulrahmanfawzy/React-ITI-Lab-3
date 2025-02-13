import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TokenContext } from "../Context/tokenContext";

export default function Register() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    cPassword: "",
    phone: "",
  };
  const navigate = useNavigate();
  const {token , setToken} = useContext(TokenContext);


  const validationSchema = Yup.object({
    username: Yup.string().min(3,"min length is 3 characters").max(10,"max length is 15 character").required("Username is required"),
    email: Yup.string().email("Email is not valid").required("Email is Required"),
    password: Yup.string().matches('^[A-Z][a-z0-9]{4,8}$',"pattern is not valid").required("password is required"),
    cPassword: Yup.string().oneOf([Yup.ref("password")]).required("confirm password is required"),
    phone: Yup.string().required("phone is required *")
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: signUp
  });

  async function signUp(value){
    try{
      const {data} = await axios.post(`http://localhost:4200/api/v1/signup` , value)
      if(data?.status == 401){
        alert(data.message)
      }else{
        navigate("/login");
      }
    } 
    catch(err){
      console.log(err);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="my-5 w-50 mx-auto">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          className="form-control"
          id="username"
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.username && formik.errors.username ? <div className="alert py-2 fs-6 alert-danger mt-2">{formik.errors.username}</div> : ""}
      </div>
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
      <div className="mb-3">
        <label htmlFor="cPassword" className="form-label">
          Repassword
        </label>
        <input
          type="password"
          name="cPassword"
          className="form-control"
          id="cPassword"
          value={formik.values.cPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.cPassword && formik.errors.cPassword ? <div className="alert py-2 fs-6 alert-danger mt-2">{formik.errors.cPassword}</div> : ""}
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          className="form-control"
          id="phone"
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.phone && formik.errors.phone ? <div className="alert py-2 fs-6 alert-danger mt-2">{formik.errors.phone}</div> : ""}
      </div>
      <button className="btn btn-primary" type="submit">
        Register
      </button>
    </form>
  );
}
