import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PersonDetails = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://swapi.dev/api/people/${id}`);
                const { data } = response;
                const firstFourAttributes = Object.entries(data).slice(0, 4);
                setPerson(firstFourAttributes);
            } catch (error) {
                setError('Error fetching person details');
                console.error('Error fetching person details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && (
                <div>
                    <h2>Detalles de la Persona con ID: {id}</h2>
                    <Link to="/">Volver a la página principal</Link>
                    {person && (
                        <ul>
                            {person.map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default PersonDetails;
