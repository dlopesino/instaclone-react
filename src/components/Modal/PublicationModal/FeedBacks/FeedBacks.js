import React from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import ImageNotFound from '../../../../assets/png/avatar.png';

import './feedbacks.scss';

const FeedBacks = ( { feedBacks, loading } ) => {

    if (loading) return null;

    return (
        <div className='feedbacks'>
            {map(feedBacks, ( { idUser: { username, avatar }, feedBack }, index ) => (
                <Link key={ index } to={`/${username}`} className='feedback'>
                    <Image src={ avatar || ImageNotFound } avatar />
                    <div >
                        <p> { username } </p>
                        <p> { feedBack } </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default FeedBacks;