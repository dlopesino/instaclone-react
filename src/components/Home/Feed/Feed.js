import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { map } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWED_POSTS } from '../../../gql/publish';
import Actions from "../../Modal/PublicationModal/Actions";
import FeedBackForm from "../../Modal/PublicationModal/FeedBackForm";
import PublicationModal from "../../Modal/PublicationModal";
import ImageNotFound from '../../../assets/png/avatar.png';

import './feed.scss';

const Feed = () => {

    const [ showModal, setShowModal ] = useState( false );
    const [ activePublication, setActivePublication ] = useState( null );
    const { data, loading, startPolling, stopPolling } = useQuery( GET_FOLLOWED_POSTS );
    
    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [ startPolling, stopPolling ])

    if( loading ) return null;
    const { getFollowedPosts } = data;
    
    const openPublication = ( publication ) => {
        setActivePublication( publication );
        setShowModal( true );
    }
    console.log(getFollowedPosts);
    return (
        <>
            <div className="feed">
                {map(getFollowedPosts, ( publication, index ) => (
                    
                    <div key={ index } className="feed__box">
                        <Link to={`/${ publication.idUser.username }`}>
                            <div className="feed__box-user">
                                <Image 
                                    src={  publication.idUser.avatar || ImageNotFound }
                                    avatar
                                />
                                <span>{  publication.idUser.name }</span>
                            </div>
                        </Link>
                        <div 
                            className="feed__box-photo"
                            style={{ backgroundImage: `url("${ publication.file }")`}}
                            onClick={ () => openPublication( publication ) }
                        />
                        <div className="feed__box-actions">
                            <Actions publication={ publication } />
                        </div>
                        <div  className="feed__box-form">
                            <FeedBackForm publication={ publication } />
                        </div>
                    </div>
                ))}
            </div>
            { showModal && 
                (
                    <PublicationModal 
                        showModal={ showModal } 
                        setShowModal={ setShowModal } 
                        publication={ activePublication } 
                    />  
                )
            }
        </>
    )
}

export default Feed;
