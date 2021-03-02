import React from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS } from '../gql/publish';
import Profile from '../components/User/Profile/Profile';
import Publications from '../components/Publications';

const User = () => {

    const { username } = useParams();
    const { data, loading } = useQuery(GET_PUBLICATIONS, { 
        variables: { username }
    });

    if (loading) return null;
    const { getPublications: publications } = data

    return (
        <>
            <Profile username={ username } publications={ publications } />
            <Publications publications={ publications } />
        </>
    )
}

export default User;
