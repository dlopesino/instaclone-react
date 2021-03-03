import React from 'react';
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_NOT_FOLLOWEDS } from '../../../gql/follow';
import { map } from 'lodash';
import ImageNotFound from '../../../assets/png/avatar.png'; 

import './not-followed-users.scss';

const NotFollowedUsers = () => {

    const { data, loading } = useQuery( GET_NOT_FOLLOWEDS );

    if ( loading ) return null;

    const { getNotFolloweds } = data;

    return (
        <div className="not-followed-users">
            <h3>Usuarios que no sigues</h3>
            { map(getNotFolloweds, ( { username, name, avatar }, index ) => (
               
                <Link
                    key={ index } 
                    to={ `/${username}`}
                    className="not-followed-users__user"
                >
                    <Image src={ avatar || ImageNotFound } avatar />
                    <span>{ name }</span>
                </Link>
         
            ))}
        </div>
    )
}

export default NotFollowedUsers;