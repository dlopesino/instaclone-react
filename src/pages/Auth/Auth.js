import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react";

import LoginForm from "../../components/Auth/LoginForm/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm/RegisterForm";

import instaClone from "../../assets/png/instaclone.png";
import "./auth.scss";

const Auth = () => {
  const [ showLogin, setShowLogin ] = useState( true );

  return (
    <Container fluid className="auth">
      <Image src={instaClone} />

      <div className="container-form">
        { showLogin 
          ? 
            ( <LoginForm /> ) 
          : 
            ( <RegisterForm setShowLogin={ setShowLogin } /> )
        }
      </div>

      <div className="change-form">
        <p> 
        { showLogin ? (
            <>
                ¿No tienes cuenta?
                <span onClick={ ()=> setShowLogin( !showLogin ) }>Registrate</span>
            </>
         ) : (
             <>
                ¿Entra con tu cuenta?
                <span onClick={ ()=> setShowLogin( !showLogin ) }>Iniciar sesión</span>
            </>
         ) }  </p>
      </div>

    </Container>
  );
};

export default Auth;
