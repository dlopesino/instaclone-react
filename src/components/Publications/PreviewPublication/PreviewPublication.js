import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import PublicationModal from '../../Modal/PublicationModal/PublicationModal';

import './preview-publication.scss';

const PreviewPublication = ({ publication }) => {

    const [showModal, setShowModal ] = useState(false);

    return (
        <>
            <div className='preview-publication' onClick={() => setShowModal(true) }>
                <Image 
                    className='preview-publication__image' 
                    src={ publication.file } 
                />
            </div>
            <PublicationModal 
                showModal={ showModal }
                setShowModal={ setShowModal }
                publication={ publication }
            />
        </>
    )
}

export default PreviewPublication;