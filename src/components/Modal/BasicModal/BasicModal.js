import React from 'react';
import { Modal } from 'semantic-ui-react';

import './basic-modal.scss';

const BasicModal = ( props ) => {
    
    const { show, setShow, title, children } = props; 

    const onClose = () => {
        setShow( false );
    }

    const { Header } = Modal;
    
    return (
        <Modal size='mini' open={show} onClose={onClose} className='basic-modal'>
            { title && (
                <Header>
                    { title }
                </Header>
            )}
            { children }
        </Modal>
    )
}

export default BasicModal;