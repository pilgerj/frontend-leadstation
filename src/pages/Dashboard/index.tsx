import React from 'react';

import MapContainer from '../Map';

import {MainDiv} from './styles';

const Dashboard = () => {
    return(
        <MainDiv>
            <header>
                <h1>Lead Station</h1>
            </header>

            <MapContainer/>
        </MainDiv>
    )
};

export default Dashboard;
