import React, { useCallback, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { toast } from "react-toastify";
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from '../../../gql/user';

import './avatar-form.scss';

const AvatarForm = ({ setShowModal, auth }) => {

    const [ loading, setLoading ] = useState( false );

    const [ updateAvatar ] = useMutation(UPDATE_AVATAR, {
        update(cache, {data: { updateAvatar }}) { // añadimos la variable update a la peticion
            
            const { getUser } = cache.readQuery({ // obtenemos los datos de la query que tenemos almacenada en la caché
                query: GET_USER, 
                variables: { username: auth.username },
            });
            cache.writeQuery({ // actualizamos la query, manadandole los nuevos datos( el avatar nuevo )
                query: GET_USER, 
                variables: { username: auth.username },
                data: {
                    getUser: {
                        ...getUser,
                        avatar: updateAvatar.urlAvatar
                    },
                },
            });
        },
     } );
     
    const [ removeAvatar ] = useMutation(DELETE_AVATAR, {
        update(cache) { //sobreescribir la caché es más optimo para el servidor
            const { getUser } = cache.readQuery({
                query: GET_USER, // query que queremos leer
                variables: { username: auth.username }
            });

            cache.writeQuery({
                query: GET_USER, // query que queremos sobreescribir
                variables: { username: auth.username },
                data: { getUser: { ...getUser, avatar: '' } },
            })
        }

    });

    const onDrop = useCallback( async ( acceptedFile ) => {
        const file = acceptedFile[0];
        try {
            setLoading( true );
            const result = await updateAvatar({ variables: { file }});
            const { data } = result;
            if ( !data.updateAvatar.status ) {
                toast.warning("Error al actualizar el avatar");
                setLoading( false );
            } else {
                setLoading( false );
                setShowModal(false );
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop,
    });

    const onDeleteAvatar = async () => {
        try {
            const result = await removeAvatar();
            const { data: { deleteAvatar } } = result;
            !deleteAvatar 
                ? 
                    ( toast.warning('Error al eliminar avatar') )
                : 
                    ( setShowModal( false ) )
        } catch (error) {
            console.log(error);
        }
    } 

    return (
        <div className='avatar-form'>
            <Button { ...getRootProps() } loading={ loading }> Cargar una foto </Button>
            <Button onClick={ onDeleteAvatar }> Eliminar foto actual </Button>
            <Button onClick={ () => setShowModal( false ) }> Cancelar </Button>
            <input { ...getInputProps() } />
        </div>
    )
}

export default AvatarForm;