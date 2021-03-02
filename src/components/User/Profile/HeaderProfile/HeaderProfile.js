import React, { useEffect, useState } from 'react';
import { Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { FOLLOW, IS_FOLLOW, UN_FOLLOW } from '../../../../gql/follow';

import './header-profile.scss';

const HeaderProfile = ({ username, sameUser, handleModal }) => {

    const params = useParams();
    const [ follow ] = useMutation( FOLLOW );
    const [ unFollow ] = useMutation( UN_FOLLOW );
    /**
        Para este ejemplo ustilizamos refetch para volver a lanzar la peticion para saber si el usuario
        es seguido o no, aunque lo mas optimo sería sobrescribir la caché como se hace en el ejemplo de 
        AvatarForm, al cambiar de avatar.
      
     */
    const { data, loading, refetch } = useQuery( IS_FOLLOW, {
        variables: {
            username: params.username
        }
    });
    
    const [ followed, setFollowed ] = useState( data ? data.isFollow : false);

    useEffect(() => {
        if (data) {
            setFollowed(data.isFollow);
        }
    }, [ data, followed, setFollowed ]);

    const handleFollow = async () => {
        try {
            await follow( {
                variables: {
                    username: params.username
                }
            } );
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    const handleUnFollow = async () => {
        try {
            await unFollow({
                variables: {
                    username: params.username
                }
            });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="header-profile">
            <h2>{ username }</h2>
            { sameUser 
                ? 
                    ( <Button 
                        className='btn-action'
                        onClick={ () => handleModal('settings') }> Ajustes </Button> ) 
                : 
                    !loading && !followed ?
                        ( <Button className='btn-action' onClick={ handleFollow }>Seguir </Button> ) 
                        :
                        ( <Button 
                            className='btn-danger'    
                            onClick={ handleUnFollow }
                        > Dejar de seguir </Button> ) 
            }
            
        </div>
    )
}

export default HeaderProfile;