import React, {useEffect, useState, FormEvent, ChangeEvent, Fragment} from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import api from '../../services/api';

import DeleteIcon from '../../assets/trash.svg';
import {Container, LeafletMapContainer, FormContainer, MarkedPointsContainer, MarkedPoint} from './styles';
 
interface MarkedPoint {
    id: string;
    latitude: number;
    longitude: number;
    description: string;
    created_at: Date;
    updated_at: Date;

};


const MapContainer: React.FC = () => {
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
    
    const [markedPoints, setMarkedPoints] = useState<MarkedPoint[]>([]);

    const [formData, setFormData] = useState({
        latitude: '',
        longitude: '',
        description: '',
    });

    //Setar ponto inicial no mapa de acordo com sua geolocation.
    useEffect( () => {
        navigator.geolocation.getCurrentPosition( pos => {
            const {latitude, longitude} = pos.coords;

            setInitialPosition([latitude, longitude]);
        });        
    }, []);

    useEffect( () => {
        api.get('/markings').then(response => {
            const data: Array<MarkedPoint> = response.data;
            setMarkedPoints(data);
        });
    }, []);
    
 

  /*
  latitude: -29.6493196, longitude: -50.7891248
  latitude: -29.6460375, longitude: -50.7838463
  */ 

    const PopupMarker = ({latitude, longitude, description}: MarkedPoint) => (
        <Marker position={[latitude, longitude]}>
            <Popup>{description}</Popup>
        </Marker>
    );

    const MarkersList = ({markers}: {markers: MarkedPoint[]}) => {
        const marks = markers.map( ({...props}) => (
            <PopupMarker key={props.id} {...props} />
        ));
        return <Fragment>{marks}</Fragment>
    };
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const {latitude, longitude, description} = formData;

        await api.post('/markings', {latitude, longitude, description} ).then( response => {
            setMarkedPoints([...markedPoints, response.data]);
        });
    };

    async function handleDeletePoint(){
        
    }
        
    return (
        <Container>
            <h1>Marque seus Points</h1>
            
            {/*---------Map---------*/ }
            <LeafletMapContainer>
            
                <Map 
                center={initialPosition} 
                zoom={15} 
                >
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />  
                    <MarkersList markers={markedPoints} />     
                        
                </Map>
            </LeafletMapContainer>
           
            {/*---------AddPoint---------*/ }
            <FormContainer onSubmit={handleSubmit}>
                <legend>
                    <h1>Criar Ponto </h1>
                </legend>
                <input 
                  type='text'
                  name='latitude'
                  id='latitude'
                  placeholder='Latitude'
                  onChange={handleInputChange}
                />

                <input 
                  type='text'
                  name='longitude'
                  id='longitude'
                  placeholder='Longitude'
                  onChange={handleInputChange}
                />

                <input 
                  type='text'
                  name='description'
                  id='description'
                  placeholder='Descrição'
                  onChange={handleInputChange}
                />

                <button type='submit'>
                    <span>Enviar</span> 
                </button>

            </FormContainer>
            {/*---------MarkedPoints---------*/ }

            <h1>Pontos Criados</h1>
            {markedPoints.map( point => (
                <MarkedPointsContainer key={point.id}>
                    <MarkedPoint>
                        <div id='title'>
                            <h2>{point.description}</h2>
                        </div>

                        <div id='latlng'>
                            <h4> Latitude:  {point.latitude}</h4>
                            <h4> Longitude: {point.longitude}</h4>
                        </div>

                        <button onClick={handleDeletePoint}>
                            <img src={DeleteIcon}/>
                        </button>
                    </MarkedPoint>
                </MarkedPointsContainer>
            ))}
            

        </Container>
    );
}

export default MapContainer;