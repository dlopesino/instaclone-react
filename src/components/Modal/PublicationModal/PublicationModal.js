import React from 'react';
import { Modal, Grid } from 'semantic-ui-react';
import FeedBackForm from './FeedBackForm/FeedBackForm';
import FeedBacks from './FeedBacks/FeedBacks';
import { useQuery } from '@apollo/client';
import { GET_FEEDBACKS } from '../../../gql/feedback';

import './publication-modal.scss';

const PublicationModal = ({ showModal, setShowModal, publication }) => {

    const { Column } = Grid;
    
    const { data, loading, refetch } = useQuery(GET_FEEDBACKS, {
        variables: { idPublication: publication.id }
    });
    if (loading) return null;
    const { getFeedBacks } = data;

    const onClose = () => setShowModal(false);

    return (
        <Modal open={showModal} onClose={onClose} className="publication-modal">
            <Grid >
                <Column 
                    className="publication-modal__left" 
                    width={10}
                    style={{ backgroundImage: `url("${publication.file}")`}}
                />
                <Column className="publication-modal__right" width={6}>
                    <FeedBacks feedBacks={ getFeedBacks } loading={ loading } />
                    <div> Actions </div>
                    <FeedBackForm publication={ publication } refetch={ refetch } />
                </Column>
            </Grid>
        </Modal>
    )
}

export default PublicationModal;
