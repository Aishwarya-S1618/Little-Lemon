import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";

// Validation Schema
const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(isSignUp ? "Sign Up Data" : "Login Data", data);
  };

  return (
    <div className="auth-container">
      {/* Animated Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-title subtitle"
      >
        {isSignUp ? "Sign Up" : "Login"}
      </motion.h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        {/* Email Field */}
        <motion.div
          className="form-group leadtext"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <p className="error paragraphtext">{errors.email.message}</p>}
        </motion.div>

        {/* Password Field */}
        <motion.div
          className="form-group leadtext"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && <p className="error paragraphtext">{errors.password.message}</p>}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="auth-button leadtext"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </motion.button>
      </form>

      {/* Toggle Button */}
      <motion.p
        className="toggle paragraphtext"
        whileHover={{ scale: 1.05, color: "#495E57" }}
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp
          ? "Already have an account? Login here."
          : "Don't have an account? Sign up here."}
      </motion.p>
    </div>
  );
};

export default LoginForm;