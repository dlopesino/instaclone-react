import React from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { Button } from 'semantic-ui-react';
import PasswordForm from '../PasswordForm';
import EmailForm from '../EmailForm';
import DescriptionForm from '../DescriptionForm';
import WebSiteForm from '../WebSiteForm';

import './settings-form.scss';

const SettingsForm = ({ setShowModal, logout, setTitleModal, setChildrenModal, user, refetch }) => {

    const history = useHistory();
    const client = useApolloClient();

    const { email, description, siteWeb } = user;

    const onChangePassword = () => {
        setTitleModal("Cambia tu password");
        setChildrenModal(<PasswordForm setShowModal={ setShowModal } logout={ onLogout } />);
    }

    const onChangeEmail = () => {
        setTitleModal("Cambia tu email");
        setChildrenModal(
            <EmailForm 
                refetch={refetch} 
                currentEmail={ email } 
                setShowModal={ setShowModal } 
            />
        )
    }

    const onChangeDescription = () => {
        setTitleModal("Añadir descripción");
        setChildrenModal(
            <DescriptionForm 
                setShowModal={ setShowModal }
                currentDescription={ description }
                refetch={refetch} 
            />)
    }

    const onChangeWebSite= () => {
        setTitleModal("Añadir sitio web");
        setChildrenModal(
            <WebSiteForm 
                setShowModal={ setShowModal }
                currentWebSite={ siteWeb }
                refetch={ refetch } 
            />
        )
    }

    const onLogout = () => {
        client.clearStore(); // limpiamos la cache de apollo
        logout(); // eliminamos del localStorage el token
        history.push('/'); // redirigimos la url a la raiz
    }

    return (
        <div className="settings-form">
            <Button onClick={ onChangePassword }>Cambiar contraseña</Button>
            <Button onClick={ onChangeEmail }>Cambiar email</Button>
            <Button onClick={ onChangeDescription }>Descripción</Button>
            <Button onClick={ onChangeWebSite }>Sitio web</Button>
            <Button onClick={ onLogout }>Cerrar sesión</Button>
            <Button onClick={ ()=> setShowModal( false )}>Cancelar</Button>
        </div>
    )
}

export default SettingsForm; 