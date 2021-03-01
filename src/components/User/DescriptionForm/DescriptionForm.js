import React from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user"
import * as Yup from 'yup';

import './description-form.scss';

const DescriptionForm = ({ setShowModal, currentDescription, refetch }) => {

    const [ updateUser ] = useMutation( UPDATE_USER ); // nos va a devolver el nombre que le hemos dado al mutate de la query
    // en este caso es updateUser

    const formik = useFormik({
        initialValues: {
            description: currentDescription ? currentDescription : ''
        },
        validationSchema: Yup.object({
            description: Yup.string().required(),
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
                toast.success("Biografía actualizada");
            } catch (error) {
                toast.error("Error al actualizar tu biografía");
            }
        }
    });

    const { values: { description }, errors: { description: descriptionErr }, handleChange, handleSubmit } = formik;

    return (
        <Form className='description-form' onSubmit={ handleSubmit } >
            <TextArea
                name='description'
                value={ description }
                onChange={ handleChange }
                className={ descriptionErr && "error" }
            />
            <Button type="submit" className='btn-submit'>Actualizar</Button>
            <Button onClick={()=> setShowModal( false ) } className='btn-cancel'>Cancelar</Button>
        </Form>
    )
}

export default DescriptionForm;