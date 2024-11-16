import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeveloperComponent = ({ developerId }) => {
  const [developer, setDeveloper] = useState([]);

  console.log(developer);
  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/developer/`);
        setDeveloper(response.data.data);
      } catch (error) {
        console.error('Error fetching developer:', error);
      }
    };

    fetchDeveloper();
  }, [developerId]);

  // Function to convert buffer to base64 using FileReader
  const bufferToBase64 = (buffer) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob([buffer]));
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="container mt-4">
      {developer.map((dev, index) => (
        <div key={dev._id}>
          <h4>{index+1}. {dev.name}</h4>
          <p>{dev.description}</p>
          <img src={`data:image/png;base64,${dev.base64Image}`} alt={dev.name} />
          <p>Total Properties: {dev.totalProperties}</p>
        </div>
      ))}
    </div>
  );
};

export default DeveloperComponent;
