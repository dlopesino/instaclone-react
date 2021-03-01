import React from 'react';
import { Button } from "semantic-ui-react";

import './header-profile.scss';

const HeaderProfile = ({ username, sameUser, handleModal }) => {
    return (
        <div className="header-profile">
            <h2>{ username }</h2>
            { sameUser 
                ? 
                    ( <Button onClick={ () => handleModal('settings') }> Ajustes </Button> ) 
                : 
                    ( <Button >Seguir </Button> ) 
            }
            
        </div>
    )
}

export default HeaderProfile;