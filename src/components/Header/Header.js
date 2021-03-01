import React from 'react';
import { Link } from "react-router-dom";
import { Container, Grid, Image } from 'semantic-ui-react';
import RightHeader from './RightHeader';
import Search from './Search';

import Logo from '../../assets/png/instaclone.png';
import './header.scss';

const Header = () => {

    const { Column } = Grid;

    return (
        <div className="header">
            <Container>
                <Grid>
                    <Column width={ 3 } className="header__logo">
                        <Link to="/">
                            <Image src={Logo} alt="Instaclone" />
                        </Link>
                    </Column>
                    <Column width={ 10}>
                        <Search />
                    </Column>
                    <Column width={ 3 }>
                        <RightHeader />
                    </Column>
                </Grid>
            </Container>
        </div>
    )
}

export default Header;
