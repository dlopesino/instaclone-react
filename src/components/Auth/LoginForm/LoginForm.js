import React, { useState } from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../../../gql/user";
import { setToken, decodeToken } from "../../../utils/token";
import useAuth from "../../../hooks/useAuth";

import './login_form.scss';

const LoginForm = () => {

    const [ error, setError ] = useState("");
    const [ login ] = useMutation( LOGIN );
    const { setUser } = useAuth();
    const { Input } = Form;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria"),
        }),
        onSubmit: async ( formData ) => {
            setError("");
            try {
                const { data } = await login( { 
                    variables: {
                        input: formData
                    }
                });
                const { token } = data.login;
                setToken( token );
                setUser(  decodeToken(token) );
            } catch (error) {
                setError(error.message);
            }
        }
    });

    const { handleSubmit, handleChange } = formik;
    const { email, password } = formik.values;

    return (
        <Form className="login-form" onSubmit={ handleSubmit }>
            <h2>Entra para ver fotos y videos de tus amigos</h2>
            <Input
                type="text"
                placeholder="Correo electronico"
                name="email"
                value={ email }
                onChange={ handleChange }
                error={ formik.errors.email && true }
            />
            <Input
                type="password"
                placeholder="Password"
                name="password"
                value={ password }
                onChange={ handleChange }
                error={ formik.errors.password && true }
            />
            <Button type="submit" className="btn-submit">
                Iniciar sesion
            </Button>
            { error && <p className="submit-error">{error}</p>}
        </Form>
    )
}

const initialValues = () => {
    return {
        email: "",
        password: ""
    };
}

export default LoginForm;
