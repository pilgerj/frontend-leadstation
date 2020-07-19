import React, {useEffect, useState, FormEvent, ChangeEvent, Fragment} from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {uuid} from 'uuidv4';

import {Container, LeafletMapContainer, FormContainer, MarkedPointsContainer} from './styles';
 
interface MarkedPoint {
    key: string;
    latitude: number;
    longitude: number;
    descricao: string;
};


const MapContainer: React.FC = () => {
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
    
    const [markedPoints, setMarkedPoints] = useState<MarkedPoint[]>([]);

    const [formData, setFormData] = useState({
        latitude: '',
        longitude: '',
        descricao: '',
    });

  /*
  latitude: -29.6493196, longitude: -50.7891248
  latitude: -29.6460375, longitude: -50.7838463
  */ 

    const PopupMarker = ({latitude, longitude, descricao}: MarkedPoint) => (
        <Marker position={[latitude, longitude]}>
            <Popup>{descricao}</Popup>
        </Marker>
    );

    const MarkersList = ({markers}: {markers: MarkedPoint[]}) => {
        const marks = markers.map( ({key, ...props}) => (
            <PopupMarker key={key} {...props} />
        ));
        return <Fragment>{marks}</Fragment>
    };

    //Setar ponto inicial no mapa de acordo com sua geolocation.
    useEffect( () => {
        navigator.geolocation.getCurrentPosition( pos => {
            const {latitude, longitude} = pos.coords;

            setInitialPosition([latitude, longitude]);
        });        
    }, []);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        const {latitude, longitude, descricao} = formData;

        if (latitude !== '' && longitude !== '' && descricao !== '' ){
            const parseLat = parseFloat(latitude);
            const parseLng = parseFloat(longitude);
            
            if(markedPoints.findIndex( mp => mp.latitude === parseLat && mp.longitude === parseLng) === -1){
                setMarkedPoints([
                    ...markedPoints,
                    {
                        key: uuid(),
                        latitude: parseLat,
                        longitude: parseLng,
                        descricao: descricao
                    }
                ]);
            }
        };
    };
        
    

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
                  name='descricao'
                  id='descricao'
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
                <MarkedPointsContainer key={point.key}>
                    <h2>{point.descricao}</h2>
                    <h4>{point.latitude}</h4>
                    <h4>{point.longitude}</h4>
                </MarkedPointsContainer>
            ))}
            

        </Container>
    );
}

export default MapContainer;