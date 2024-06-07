import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from 'react-hot-toast';

export default function SignInForm({ headerText, handleOnClick }) {
  return (

    <div className="form-container sign-in-container">
      <div><Toaster/></div>
      <h1>Login</h1>

      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .matches(
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              "Invalid email address"
            )
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            const formData = {
              email: values.email,
              password: values.password
            };

            fetch('http://localhost:5000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            })
             .then(response => response.json())
             .then(data => {
                console.log(data);
                if (data.msg === 'User Logged in') {
                  
                  toast.success(data.msg, {
                    style: {
                      border: '1px solid #713200',
                      padding: '16px',
                      color: '#000000',
                      backgroundColor: '#808080	',
                    },
                    iconTheme: {
                      primary: '#000000',
                      secondary: '#FFFAEE',
                    },
                  });
                }
                else{
                  toast.error(data.msg, {
                    style: {
                      border: '1px solid #713200',
                      padding: '16px',
                      color: '#000000',
                      backgroundColor: '#808080	',
                    },
                    iconTheme: {
                      primary: '#000000',
                      secondary: '#FFFAEE',
                    },
                  });
                }
             })
             .catch(error => console.error(error));

            resetForm();
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            <Field
              type="password"
              name="password"
              placeholder="Password"
            />
            <a href="#">Forgot your password?</a>
            <button type="submit" disabled={isSubmitting}>
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
