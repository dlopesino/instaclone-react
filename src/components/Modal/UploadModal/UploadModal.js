import React, { useState, useCallback } from 'react';
import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { PUBLISH } from '../../../gql/publish';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

import './upload-modal.scss';

const UploadModal = ( { show, setShow } ) => {

    const [ fileUpload, setFileUpload ] = useState( null );
    const [ publish ] = useMutation( PUBLISH );
    const [isLoading, setIsLoading] = useState( false );

    const onDrop = useCallback( ( acceptedFile ) => {
        const file = acceptedFile[0];
        setFileUpload({
            type: file.type.split('/')[0],
            file,
            preview: URL.createObjectURL(file),
        });
    });

    // getRootProps --> para la caja que envuelva nbuestro Input
    // getInputProps --> para añadir los props a nuestro Input para poder subir imagenes
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    const onClose = () => {
        setFileUpload(null);
        setIsLoading(false);
        setShow(false);
    }

    const onPublish = async () => {
        try {
            setIsLoading(true);
            const { data: { publish: { status } } } = await publish({
                variables: {
                    file: fileUpload.file
                }
            });

            if ( !status ) {
                toast.warning('Error en la publicación');
            }
            onClose();
        } catch (error) {
            console.log( error );
        }
    }

    return (
        <Modal size="small" open={ show } onClose={ onClose } className='upload-modal'>
            <div { ...getRootProps() } className='dropzone' style={ fileUpload && { border: 0 } }>
                
                {!fileUpload && (
                     <>
                        <Icon name="cloud upload" />
                        <p>Arrastra tu foto que quieras publicar</p>
                     </>
                ) }
                <input { ...getInputProps() } />
            </div>
            { fileUpload?.type === 'image' && (
                <div className='image' style={{ backgroundImage: `url("${ fileUpload.preview }")`}} />
            )}

            { fileUpload && (
                <Button 
                    className='btn-upload btn-action' 
                    onClick={ ()=> onPublish() }
                >Publicar
                </Button>
            )}

            { isLoading && (
                <Dimmer active className='publishing'> 
                    <Loader />
                    <p>Publicando...</p>
                </Dimmer>
            )}

        </Modal>
    )
}

export default UploadModal;
