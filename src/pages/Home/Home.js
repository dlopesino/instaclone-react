import React from 'react';
import { Grid } from "semantic-ui-react";
import Feed from '../../components/Home/Feed';
import NotFollowedUsers from '../../components/Home/NotFollowedUsers';

import "./home.scss";

const Home = () => {

    const { Column } = Grid;

    return (
        <Grid className="home">
            <Column className="home__left" width={ 11 }> 
                <Feed />
            </Column>
            <Column className="home__right" width={5}>
                <NotFollowedUsers />
            </Column>
        </Grid>
    )
}

export default Home;
