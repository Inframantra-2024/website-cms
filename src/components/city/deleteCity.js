import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCity, fetchFeature2Data } from '../../features/features2/feature2Slice';

const DeleteCityComponent = ({ cityId, closeModal }) => {
    const dispatch = useDispatch();

    const handleDeleteCity = async () => {
        try {
            await dispatch(deleteCity(cityId));
            await dispatch(fetchFeature2Data());
            closeModal(); // Close the modal after deletion
        } catch (error) {
            console.error('Error deleting city:', error);
        }
    };

    const handleCancel = () => {
        closeModal(); // Close the modal without deleting the city
    };

    return (
        <div className='mt-4 container'>
            <h2 className='text-center bg-primary text-white p-3 text-uppercase'>Delete City</h2>
            <p>Are you sure you want to delete this city?</p>
            <button onClick={handleDeleteCity}>Yes</button>
            <button onClick={handleCancel}>No</button>
        </div>
    );
};

export default DeleteCityComponent;
