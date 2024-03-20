import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import DropdownMenu from './componentes/DropdownMenu';
import obiWanImage from './obi-wan.gif';
import ResourceForm from './componentes/ResourceForm';
import PersonDetails from './componentes/PersonDetails';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState('');
  const [id, setId] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorImage, setShowErrorImage] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/');
        const { data } = response;
        setResources(Object.keys(data));
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://swapi.dev/api/${selectedResource}/${id}`);
      const { data } = response;
      const selectedData = Object.keys(data).reduce((acc, key) => {
        if (Object.keys(acc).length < 4) {
          acc[`${key} ID`] = data[key];
        }
        return acc;
      }, {});
      setData(selectedData);

    } catch (error) {
      setError('Estos no son los droides que estás buscando');
      setShowErrorImage(true);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectResource = (resource) => {
    setSelectedResource(resource);
  };

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      setError('Please enter an ID');
      setShowErrorImage(true);
    } else {
      await fetchData();
    }
  };

  return (
    <div className="container">
      <DropdownMenu resources={resources} selectedResource={selectedResource} onSelectResource={handleSelectResource} />
      <Routes>
        <Route exact path="/" element={<ResourceForm handleSubmit={handleSubmit} handleChange={handleChange} id={id} error={error} showErrorImage={showErrorImage} obiWanImage={obiWanImage} data={data} />} />
        <Route path="/:id" element={<PersonDetails personData={data} />} />
      </Routes>
    </div>
  );
};

export default App;
