import React, { useState } from 'react'
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { markerIcon } from '../mapIcons';
import { useEffect } from 'react';
import axios from 'axios';

const AllMarkers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get('/users');
            setUsers([
                ...response.data
            ]);
        }

        fetchData();
    }, []);
    console.log(users)
    const Markers = users.map(user => {

        return (
            <Marker position={[user.coordinate[0], user.coordinate[1]]} key={user.id} icon={markerIcon}>
                <Popup>
                   <p>{user.name} {user.last_Name}</p> 
                </Popup>
            </Marker>
        )
    })

  return Markers;
}

export default AllMarkers