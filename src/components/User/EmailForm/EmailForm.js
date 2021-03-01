import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import * as Yup from 'yup';

import './email-form.scss';

const EmailForm = ({ setShowModal, currentEmail, refetch }) => {

    const { Input } = Form;

    const [ updateUser ] = useMutation( UPDATE_USER );

    const formik = useFormik({
        initialValues: {
            email: currentEmail || ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
        }),
        onSubmit: async ( formValues ) =>{
            try {
                const { data } = await updateUser({
                    variables: {
                        input:  formValues
                    }
                });   
                data.updateUser 
                    ? 
                        ( toast.success('Email actualizado') )
                    : 
                        ( toast.warning( 'No se pudo actualizar el email' ) );
                refetch();
                setShowModal( false );
            } catch (error) {
                toast.warning( 'Error al actualizar el email' );
                console.log( error );
            }
        }
    });

    const { values, errors, handleChange, handleSubmit } = formik;
    const { email } = values;
    const { email: errEmail } = errors;

    return (
        <Form onSubmit={ handleSubmit } className='email-form'>
            <Input 
                type='text'
                placeholder='New Email'
                name='email'
                value={ email }
                onChange={ handleChange }
                error={ errEmail && true }
            />
            <Button type="submit" className="btn-submit">Actualizar</Button>
            <Button 
                onClick={ ()=> setShowModal(false) } 
                className='btn-cancel'
            >
                Cancelar
            </Button>
        </Form>
    )
}

export default EmailForm;
