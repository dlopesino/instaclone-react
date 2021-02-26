import React, { useState } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { useQuery } from "@apollo/client";
import { GET_USER } from '../../gql/user';
import useAuth from '../../hooks/useAuth';
import UserNotFound from '../UserNotFound';
import BasicModal from '../Modal/BasicModal';
import AvatarForm from '../AvatarForm/AvatarForm';

import ImageNotFound from '../../assets/png/avatar.png';
import './profile.scss';

const Profile = ( { username } ) => {

    const [ showModal, setShowModal ] = useState( false );
    const [ titleModal, setTitleModal ] = useState('');
    const [ childrenModal, setChildrenModal ] = useState( null );
    const { auth } = useAuth();
    const same = auth.username === username;

    const { Column } = Grid;

    const { data, loading, error } = useQuery( GET_USER, { 
        variables: { username }
    } );

    if (loading )return null;
    if (error) return <UserNotFound /> ;

    const { getUser: { name, siteWeb, description, avatar } } = data;

    const handleModal = ( type ) => {
        switch (type) {
            case 'avatar':
                setTitleModal("Cambiar foto de perfil");
                setChildrenModal(
                    <AvatarForm setShowModal={ setShowModal } auth={ auth } />
                )
                setShowModal( true );
                break;
            case 'avatar':
                
                break;
        
            default:
                break;
        }
    }

    return (
        <>
           <Grid className="profile">
                <Column width={ 5 } className="profile__left">
                    <Image 
                        src={ avatar ? avatar : ImageNotFound } 
                        avatar 
                        onClick={ ()=> same && handleModal('avatar') }
                    />
                </Column>
                <Column width={ 11 } className="profile__right">
                   <div>HeaderProfile</div>
                   <div>Followers</div>
                   <div className="other">
                       <p className="name"> { name } </p>
                       { siteWeb && (
                           <a href={ siteWeb } className="siteWeb" target="_blank">
                               { siteWeb }
                            </a>
                       )}
                        { description && (
                            <p className="description">{ description }</p>
                        )}
                   </div>
                </Column>
           </Grid>

           <BasicModal show={showModal} setShow={setShowModal} title={ titleModal }>
               { childrenModal }
           </BasicModal>
        </>
    )
}

export default Profile;
