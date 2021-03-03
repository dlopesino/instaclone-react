import { gql } from '@apollo/client';

export const PUBLISH = gql`
    mutation publish($file: Upload) {
        publish(file: $file) {
            status
            urlFile
        }
    }
`;

export const GET_PUBLICATIONS = gql`
    query getPublications( $username: String!) {
        getPublications(username: $username) {
            id
            idUser
            file
            typeFile
            created_at
        }
    }
`;

export const GET_FOLLOWED_POSTS = gql`
    query getFollowedPosts {
        getFollowedPosts {
            id
            idUser {
                name
                username
                avatar
            }
            file
            fileType
            created_at
        }
    }
`;