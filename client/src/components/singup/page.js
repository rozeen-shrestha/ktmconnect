import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


export default function SignUpForm({ headerText, handleOnClick }) {
  return (
    <div className="form-container sign-up-container">
      <h1>Create An Account</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={Yup.object({
          name: Yup.string()
           .required("Required")
           .min(2, "Name must be at least 2 characters"),
          email: Yup.string()
           .email("Invalid email address")
           .required("Required"),
          password: Yup.string()
           .required("Required")
           .min(8, "Must be 8 characters or more")
           .matches(/[a-z]+/, "One lowercase character")
           .matches(/[A-Z]+/, "One uppercase character")
           .matches(/[@$!%*#?&.]+/, "One special character")
           .matches(/\d+/, "One number"),
          confirmPassword: Yup.string()
           .oneOf([Yup.ref('password'), null], 'Passwords must match')
           .required('Required')
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            const formData = {
              name: values.name,
              email: values.email,
              password: values.password
            };

            fetch('http://localhost:5000/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            })
             .then(response => response.json())
             .then(data => console.log(data))
             .catch(error => console.error(error));


            resetForm();
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" className="error" style={{ color: 'ed' }} />
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" style={{ color: 'ed' }} />
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" style={{ color: 'ed' }} />
            <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
            <ErrorMessage name="confirmPassword" component="div" className="error" style={{ color: 'ed' }} />
            <button type="submit" disabled={isSubmitting}>Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}