import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';

import './password-form.scss';

const PasswordForm = ({ setShowModal, logout }) => {

    const { Input } = Form;

    const [ updateUser ] = useMutation( UPDATE_USER );

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string().required().oneOf([Yup.ref('repeatPassword')]),
            repeatPassword: Yup.string().required().oneOf([Yup.ref('newPassword')]),
        }),
        onSubmit: async (formValues) => {
            
            const newPassword = formValues;
            delete newPassword.repeatPassword;

            try {
                const { data } = await updateUser({
                    variables: { 
                        input: newPassword
                     }
                });
                if ( data.updateUser ) {
                    logout();
                    toast.success("Contraseña guardada correctamente")
                } else {
                    toast.warning("No se pudo cambiar la contraseña");
                }
            } catch (error) {
                console.log( error );
                toast.warning("Error al cambiar la contraseña")
            }
        }
    });

    const { values, errors, handleSubmit, handleChange } = formik;
    const { currentPassword, newPassword, repeatPassword } = values;
    const { currentPassword: errCurrentPassword, newPassword: errNewPassword, repeatPassword: errRepeatPassword } = errors;

    return (
        <Form onSubmit={ handleSubmit } className="password-form">
            <Input
                type='password'
                placeholder='Contraseña actual'
                name='currentPassword'
                value={ currentPassword }
                onChange={ handleChange }
                error={ errCurrentPassword && true }
            />
            <Input
                type='password'
                placeholder='Nueva contraseña'
                name='newPassword'
                value={ newPassword }
                onChange={ handleChange }
                error={ errNewPassword && true }
            />
            <Input
                type='password'
                placeholder='Repetir nueva contraseña'
                name='repeatPassword'
                value={ repeatPassword }
                onChange={ handleChange }
                error={ errRepeatPassword && true }
            />
            <Button type='submit' className='btn-submit'>Actualizar</Button>
            <Button onClick={ ()=> setShowModal(false) } className='btn-cancel'>Cancelar</Button>
        </Form>
    )
}

function initialValues() {
    return {
        currentPassword: "",
        newPassword: "",
        repeatPassword: ""
    }
}
export default PasswordForm;