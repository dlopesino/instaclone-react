import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_LIKE, DELETE_LIKE, IS_LIKE, COUNT_LIKES } from '../../../../gql/like';

import './actions.scss';

const Actions = ({ publication }) => {

    const { id: idPublication } = publication;
    const [ addLike ] = useMutation( ADD_LIKE );
    const [ deleteLike ] = useMutation( DELETE_LIKE );
    const { 
        data: dataLikes, 
        loading: loadingLikes, 
        refetch: refetchLikes 
    } = useQuery( IS_LIKE, {
        variables: {
            idPublication
        }
    } );

    const { 
        data: dataCount, 
        loading: loadingCount, 
        refetch: refetchCount 
    } = useQuery( COUNT_LIKES, {
        variables: {
            idPublication 
        }
    } );

    const [ isLiked, setIsLiked ] = useState( false );
    const [ likesNumber, setLikesNumber ] = useState( 0 );

    useEffect(() => {
        if (!loadingLikes) {
            setIsLiked( dataLikes.isLike );
        }
    }, [ dataLikes, loadingLikes  ]);

    useEffect(() => {
        if ( !loadingCount ) {
            setLikesNumber( dataCount.countLikes );
        }
    }, [ dataCount, loadingCount ])

    const onAddLike = async () => {
        try {
            await addLike({
                variables: {
                    idPublication
                }
            });
            refreshLikes();
        } catch (error) {
            console.log(error);
        }
    }

    const onDeleteLike = async () => {
        try {
            await deleteLike({
                variables: {
                    idPublication
                }
            });
            refreshLikes();
        } catch (error) {
            
        }
    }

    const refreshLikes = () => {
        refetchLikes();
        refetchCount();
    }

    return (
        <div className="actions">
            <Icon 
                className={ isLiked ? "like active" : "like"}
                name={isLiked ? "heart" : "heart outline"}
                onClick={ isLiked ? onDeleteLike : onAddLike }
            /> 
            { likesNumber } {likesNumber === 1 ? "Likes" : "Like" }
        </div>
    )
}

export default Actions;
