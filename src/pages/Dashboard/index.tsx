import React from 'react';

import MapContainer from '../Map';
import MarksContainer from '../Marks';

import {MainDiv} from './styles';

const Dashboard = () => {
    return(
        <MainDiv>
            <header>
                <h1>Lead Station</h1>
            </header>

            <MapContainer/>
            
            <MarksContainer/>
        </MainDiv>
    )
};

export default Dashboard;
