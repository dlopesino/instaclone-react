import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { ADD_FEEDBACK } from '../../../../gql/feedback';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './feed-back-form.scss';

const FeedBackForm = ({ publication, refetch }) => {
    
    const { Input } = Form;

    const [ addFeedBack ] = useMutation(ADD_FEEDBACK);

    const formik = useFormik({
        initialValues: {
            feedBack: ''
        },
        validationSchema: Yup.object({
            feedBack: Yup.string().required(),
        }),
        onSubmit: async ( formData ) => {
            try {
                await addFeedBack({
                    variables: {
                        input: {
                            idPublication: publication.id,
                            feedBack: formData.feedBack
                        }
                    }
                });
                refetch();
                handleReset();
            } catch (error) {
                console.log( error );
            }
        }
    });

    const { 
        values:{ feedBack }, 
        errors: { feedBack: feedBackErr }, 
        handleChange, 
        handleSubmit,
        handleReset
    } = formik;

    return (
        <Form className='feed-back-form' onSubmit={ handleSubmit }>
            <Input 
                placeholder="Añade un comentario..." 
                name="feedBack"
                value={ feedBack }
                onChange={ handleChange }
                error={ feedBackErr && true }
            />
            <Button type="submit">Publicar</Button>
        </Form>
    )
}

export default FeedBackForm;
