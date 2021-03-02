import React from 'react';
import { Grid } from 'semantic-ui-react';
import { map } from 'lodash';
import PreviewPublication from './PreviewPublication/PreviewPublication';

import './publications.scss';

const Publications = ({ publications }) => {

    const { Column } = Grid;

    return (
        <div className='publications'>
            <h1>Publicaciones</h1>
            <Grid columns={4}>
                { map(publications, ( publication, index ) => (
                    <Column key={ index} >
                        <PreviewPublication publication={ publication } />
                    </Column>
                ))}
            </Grid>
        </div>
    )
}

export default Publications
