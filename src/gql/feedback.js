import { gql } from '@apollo/client';

export const ADD_FEEDBACK = gql`
    mutation addFeedBack($input: FeedBackInput) {
        addFeedBack(input: $input) {
            idPublication
            feedBack
        }
    }
`;

export const GET_FEEDBACKS = gql`
    query getFeedBacks($idPublication: ID!) {
        getFeedBacks(idPublication: $idPublication) {
            feedBack
            idUser {
                username
                avatar
            }
        }
    }
`;