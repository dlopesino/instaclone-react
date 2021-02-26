import React from 'react';
import { useParams } from "react-router-dom";

import Profile from '../components/Profile';

const User = () => {

    const { username } = useParams();

    return (
        <>
            <Profile username={ username } />
        </>
    )
}

export default User;
