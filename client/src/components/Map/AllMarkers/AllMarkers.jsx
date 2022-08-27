import React, { useState } from 'react'
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import {nameStyle , imgDiv, imgStyle, containerStyle, dataDiv, oficioStyle} from './styles';
import { electricistaIcon, jardineroIcon, plomeroIcon, gasistaIcon, pintorIcon, costureroIcon, programadorIcon, carpinteroIcon, albanilIcon} from '../mapIcons';
import { useEffect } from 'react';
import axios from 'axios';
import { getLocalStorage } from '../../../handlers/localStorage';

const AllMarkers = () => {
    const [users, setUsers] = useState([]);
    const activeUser = getLocalStorage();

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get('/users');
            setUsers([
                ...response.data
            ]);
        }

        fetchData();
    }, []);

    const Markers = users.map(user => {
        let iconMarker;
        if(user?.professions[0]?.name === 'electricista'){
            iconMarker = electricistaIcon;
        }
        if(user?.professions[0]?.name === 'jardinero'){
            iconMarker = jardineroIcon;
        }
        if(user?.professions[0]?.name === 'plomero'){
            iconMarker = plomeroIcon;
        }
        if(user?.professions[0]?.name === 'gasista'){
            iconMarker = gasistaIcon;
        }
        if(user?.professions[0]?.name === 'programador'){
            iconMarker = programadorIcon;
        }
        if(user?.professions[0]?.name === 'costurero'){
            iconMarker = costureroIcon;
        }
        if(user?.professions[0]?.name === 'carpintero'){
            iconMarker = carpinteroIcon;
        }
        if(user?.professions[0]?.name === 'pintor'){
            iconMarker = pintorIcon;
        }
        if(user?.professions[0]?.name === 'albanil'){
            iconMarker = albanilIcon;
        }

       return activeUser?.id === user?.id ? '' : (
            <Marker position={[user.coordinate[0], user.coordinate[1]]} key={user.id} icon={iconMarker}>
                <Link to={`/details/${user.id}`}>
                    <Popup className='professional-popup'>
                        <div style={containerStyle}>
                            <div style={imgDiv}>
                                <img src={user.image} alt="userImage" style={imgStyle} />
                            </div>
                            <div style={dataDiv}>
                                <p style={nameStyle}>{user.name} {user.last_Name}</p>
                                <p style={oficioStyle}>{user.professions[0].name === 'albanil' ? 'Albañil' : user.professions[0].name}</p>
                            </div>
                        </div>
                    </Popup>
                </Link>
            </Marker>
        );
    })

  return Markers;
}

export default AllMarkers