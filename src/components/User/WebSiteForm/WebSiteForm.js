import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { toast} from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UPDATE_USER } from '../../../gql/user';

import './website-form.scss';

const WebSiteForm = ( { setShowModal, currentWebSite, refetch } ) => {

    const { Input } = Form;
    const [ updateUser ] = useMutation( UPDATE_USER );
    const formik = useFormik({
        initialValues: { siteWeb: currentWebSite ? currentWebSite : ''},
        validationSchema: Yup.object({
            siteWeb: Yup.string().required()
        }),
        onSubmit: async ( formData ) => {
            try {
                await updateUser({
                    variables: {
                        input: formData
                    }
                });
                refetch();
                setShowModal( false );
                toast.success("Web site actualizado!");
            } catch (error) {
                toast.error("Error al actualizar Web Site");
            }
        },
    });

    const { values: { siteWeb }, errors: { siteWeb: siteWebErr }, handleChange, handleSubmit } = formik;

    return (
        <Form className='website-form' onSubmit={ handleSubmit } >
            <Input
                type='text'
                placeholder='Web site'
                name='siteWeb'
                value={ siteWeb }
                onChange={ handleChange }
                error={ siteWebErr && true }
            />
            <Button type='submit' className='btn-submit'>Actualizar</Button>
            <Button onClick={()=> setShowModal( false ) } className='btn-cancel'>Cancelar</Button>
        </Form>
    )
}

export default WebSiteForm;