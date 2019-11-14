import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Form = ({ values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);

    useEffect( () => {
        status && setUsers(users => [...users, status])
    })
    return(
        <div className='form'>
            <Form>
                <Field type='text' name='name' placeholder='Name' />
                
                <Field type='email' name='email' placeholder='Email' />

                <Field type='password' name='password' placeholder='password' />

                <Field type='checkbox' name='tos' checked={values.tos} />

                <button>Submit</button>
            </Form>
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
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        tos: Yup.bool().required()
    })
})
