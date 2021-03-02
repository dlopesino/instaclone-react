import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWERS, GET_FOLLOWEDS } from '../../../../gql/follow';
import BasicModal from '../../../Modal/BasicModal';
import UsersList from '../../UsersList';
import { size } from 'lodash';

import './followers.scss';

const Followers = ({ username }) => {

    const [ showModal, setShowModal ] = useState( false );
    const [ titleModal, setTitleModal ] = useState( '' );
    const [ childrenModal, setChildrenModal ] = useState( null );

    // startPolling y stopPolling --> son para actualizar en tiempo real la app
    // en este caso para tener actualizado en todo momento el numero de seguidores/seguidos
    // de cada usuario. De momento lo hago como en el video, pero es mejor hacerlo con socket.io
    const { 
        data: dataFollowers, 
        loading: loadingFollowers,
        startPolling: startPollingFollowers, 
        stopPolling: stopPollingFollowers,
    } = useQuery(GET_FOLLOWERS, {
        variables: { username }
    });

    const { 
        data: dataFolloweds,
        loading: loadingFolloweds,
        startPolling: startPollingFolloweds,
        stopPolling: stopPollingFolloweds
        
    } = useQuery(GET_FOLLOWEDS, {
        variables: { username }
    });

    // efecto temporal, cambiar por sockets
    useEffect(() => {
        startPollingFollowers(1000);
        return () => {
            stopPollingFollowers();
        }
    }, [ startPollingFollowers, stopPollingFollowers ]);

    useEffect(() => {
        startPollingFolloweds(1000);
        return () => {
            stopPollingFolloweds(1000);
        }
    }, [ startPollingFolloweds, stopPollingFolloweds ]);

    const openFollowers = () => {
        setTitleModal('Seguidores');
        setChildrenModal(
            <UsersList 
                users={ followers } 
                setShowModal={ setShowModal } 
            />
        );
        setShowModal(true);
    }

    const openFolloweds = () => {
        setTitleModal('Seguidos');
        setChildrenModal(
            <UsersList
                users={ followeds }
                setShowModal={ setShowModal }
            />
        );
        setShowModal(true);
    }

    if ( loadingFollowers || loadingFolloweds ) return null;
    const { getFollowers: followers } = dataFollowers;
    const { getFolloweds: followeds } = dataFolloweds;

    return (
        <>
            <div className='followers'>
                <p> 
                    <span>**</span> publicaciones 
                </p>
                <p className='link' onClick={ openFollowers }> 
                    <span>{ size( followers ) }</span> seguidores 
                </p>
                <p className='link' onClick={ openFolloweds }> 
                    <span>{ size( followeds ) } </span> seguidos
                </p>
            </div>
            <BasicModal show={ showModal } setShow={ setShowModal } title={ titleModal }>
                { childrenModal }
            </BasicModal>
        </>
    )
}

export default Followers;
