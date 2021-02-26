import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";

import './register_form.scss';

const RegisterForm = ( props ) => {

    const { setShowLogin } = props;

    const [ register ] = useMutation( REGISTER );

    const { Input } = Form;

    // Validaciones de formulario
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required(true),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, 
                "El nombre del usuario no puede tener espacio"
                ).required("El nombre de usuario es obligatorio"),
            email: Yup.string().email("El email no es válido")
                .required("El email es obligatorio"),
            
            password: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
            repeatPassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),
        }),
        onSubmit: async ( formData ) => {
            try {
                const newUser = formData;
                delete newUser.repeatPassword;

                const result = await register( {
                    variables: {
                        input: newUser
                    }
                } );
                toast.success("Usuario registrado correctamente")
                setShowLogin(true);
            } catch (error) {
                toast.error( error.message );
            }
        }
    });
    const { handleSubmit, handleChange } = formik;
    const {  name, username, email, password, repeatPassword } = formik.values;


    return (
        <>
            <h2 className="register-form-title">
                Regístrate para ver fotos y vídeos de tus amigos.
            </h2>
            <Form  onSubmit={ handleSubmit } className="register-form">
                <Input  
                    type="text"
                    placeholder="Nombre y apellidos"
                    name="name"
                    value={ name }
                    onChange={ handleChange }
                    error={ formik.errors.name && true }
                />
                 <Input  
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username"
                    value={ username }
                    onChange={ handleChange }
                    error={ formik.errors.username && true }
                />
                <Input  
                    type="text"
                    placeholder="Correo electrónico"
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
                <Input  
                    type="password"
                    placeholder="Repeat Password"
                    name="repeatPassword"
                    value={ repeatPassword }
                    onChange={ handleChange }
                    error={ formik.errors.repeatPassword && true }
                />
                <Button
                    type="submit"
                    className="btn-submit"
                >Registrarse</Button>
            </Form>
        </>
    )
}

function initialValues () {
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
    }
}

export default RegisterForm;
