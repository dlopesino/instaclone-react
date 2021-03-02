import React, { useState } from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import useAuth from '../../../hooks/useAuth';
import UploadModal from '../../Modal/UploadModal';

import ImageNoFound from '../../../assets/png/avatar.png';
import './right-header.scss';

const RightHeader = () => {

    const [ showModal, setShowModal ] = useState( false );
    const { auth } = useAuth();

    const { data, loading, error } = useQuery( GET_USER, {
        variables: { username: auth.username }
    });

    if( loading || error ) return null;
    const { getUser: { username, avatar } } = data;

    return (
        <>
            <div className="right-header">
                <Link to='/'>
                    <Icon name='home' />
                </Link>
                <Icon name='plus' onClick={ () => setShowModal(true)} />
                <Link to={`/${ username }`}>
                    <Image src={ avatar ? avatar : ImageNoFound } avatar />
                </Link>
            </div>
            <UploadModal show={ showModal } setShow={ setShowModal } />
        </>
    )
}

export default RightHeader;
