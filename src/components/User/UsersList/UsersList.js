import React from 'react';
import { useHistory } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { size, map } from 'lodash';
import ImageNotFount from '../../../assets/png/avatar.png';

import './users-list.scss';

const UsersList = ({ users, setShowModal }) => {

    const history = useHistory();

    const goToUser = (username) => {
        history.push( `/${username}` );
        setShowModal( false );
    }
    return (
        <div className="users-list">
            { size(users) === 0 
                    ?
                (<p className="users-list__no-users">No se han encontrado usuarios</p>) 
                    :
                (
                   map( users, ( { name, username, avatar}, index ) => (
                       <div key={index} onClick={ () => goToUser( username ) } className="users-list__user">
                           <Image src={ avatar || ImageNotFount } avatar />
                            <div>
                                <p>{ name }</p>
                                <p>{ username }</p>
                            </div>
                       </div>
                   )) 
                )
            }
        </div>
    )
}

export default UsersList;
