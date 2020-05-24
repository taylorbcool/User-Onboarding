import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers([...users, status]);
      }, [status]);

    return(
        <div>
            <div className='form-container'>
                <Form className='form'>
                    <h1>Add User</h1>
                    <Field className='form-field' type='text' name='name' placeholder='Name' />
                    {touched.name && errors.name && (
                        <p className='errors'>{errors.name}</p>
                    )}
                    <Field className='form-field' type='email' name='email' placeholder='Email' />
                    {touched.email && errors.email && (
                        <p className='errors'>{errors.email}</p>
                    )}
                    <Field className='form-field' type='password' name='password' placeholder='password' />
                    {touched.password && errors.password && (
                        <p className='errors'>{errors.password}</p>
                    )}
                    <div className='tos'>
                        <p>Agree to Terms of Service</p>
                        <Field type='checkbox' name='tos' checked={values.tos} />
                        {touched.tos && errors.tos && (
                        <p className='errors'>{errors.tos}</p>
                    )}
                    </div>

                    <button>Submit</button>
                </Form>
            </div>
            <div className='users-container'>
                <h1>Users</h1>
                {users.map(user => (
                    <div className='user'>
                        <ul key={user.id}>
                            <li>Name: {user.name}</li>
                            <li>Email: {user.email}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false,
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required()
            .min(4, 'Must be at least 4 characters'),
        email: Yup.string()
            .required()
            .email('Must be valid email'),
        password: Yup.string()
            .required()
            .min(8, 'Must be at least 8 characters'),
        tos: Yup.boolean()
            .oneOf([true], 'Must agree to ToS')
            
    }),
    handleSubmit(values, { setStatus }) {
        // values is our object with all our data on it
        axios
          .post("https://reqres.in/api/users/", values)
          .then(res => {
            setStatus(res.data);
            console.log(res);
          })
          .catch(err => console.log(err.response));
      }
})(UserForm);

export default FormikUserForm