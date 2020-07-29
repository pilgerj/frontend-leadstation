import React, {useEffect, useState, FormEvent, ChangeEvent, Fragment, useRef, useCallback} from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import api from '../../services/api';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import {FiChevronsUp, FiChevronsRight, FiTag} from 'react-icons/fi';
import DeleteIcon from '../../assets/trash.svg';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {Container, LeafletMapContainer, FormContainer, MarkedPointsContainer, MarkedPoint} from './styles';

interface MarkedPoint {
    id: string;
    latitude: number;
    longitude: number;
    description: string;
    created_at: Date;
    updated_at: Date;
};

interface NewMarkingPointData {
    latitude: string;
    longitude: string;
    description: string;
}


const MapContainer: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
    
    const [markedPoints, setMarkedPoints] = useState<MarkedPoint[]>([]);

    const [formData, setFormData] = useState({
        latitude: '',
        longitude: '',
        description: '',
    });

/*
  latitude: -29.6493196, longitude: -50.7891248
  latitude: -29.6460375, longitude: -50.7838463
  */ 

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
 
    const handleSubmit = useCallback(async (data: NewMarkingPointData) => {  
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                latitude: Yup.string()
                             .matches(/-?\d{1,3}\.\d+/, 'Formato incorreto. Exemplo: -29.6460375')
                             .required('Latitude obrigatória.'),
                longitude: Yup.string()
                              .matches(/-?\d{1,3}\.\d+/, 'Formato incorreto. Exemplo: -29.6460375')
                              .required('Longitude obrigatória.'),
                description: Yup.string()
                                .required('Descrição obrigatória.'),
            });
            
            await schema.validate(data, {
                abortEarly: false,
            });

            const {latitude, longitude, description} = data;

            await api.post('/markings', {latitude, longitude, description} ).then( response => {
                const newMarkingPoint = response.data;
                
                console.log(newMarkingPoint);
                setMarkedPoints([...markedPoints, newMarkingPoint]);
            });
            
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                const errors = getValidationErrors(error);
                formRef.current?.setErrors(errors);
                return;
            }

            console.log(error);
        }
    }, [markedPoints]);

    async function handleDeletePoint(id: string){
        await api.delete(`/markings/${id}`).then( response => {
            console.log(response.data)
            setMarkedPoints(response.data);  
        });
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
            <FormContainer>

                <h1>Criar Ponto </h1>
                
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input name='latitude' icon={FiChevronsRight} placeholder='Latitude' maxLength={11} />
                    <Input name='longitude' icon={FiChevronsUp} placeholder='Longitude' maxLength={11} />
                    <Input name='description' icon={FiTag} placeholder='Descrição' maxLength={25}/>
                    <Button type='submit'>Enviar</Button>
                </Form>
            </FormContainer>
            {/*---------MarkedPoints---------*/ }

            <h1>Pontos Criados</h1>
            {markedPoints.map( point => (
                <MarkedPointsContainer key={point.id}>
                    <MarkedPoint>
                        <div id='title' >
                            <h2>{point.description}</h2>
                        </div>

                        <div id='latlng'>
                            <h4> Latitude:  {point.latitude}</h4>
                            <h4> Longitude: {point.longitude}</h4>
                        </div>

                        <button onClick={ () => handleDeletePoint(point.id)}>
                            <img id='deleteButton' src={DeleteIcon}/>
                        </button>

                    </MarkedPoint>
                </MarkedPointsContainer>
                )
            )}  
        </Container>
    );
}

export default MapContainer;
