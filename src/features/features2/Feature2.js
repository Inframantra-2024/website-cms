import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeature2Data, deleteCity } from './feature2Slice';
import CreateCityComponent from '../../components/city/createCity';
import UpdateCityComponent from '../../components/city/updateCity';
import DeleteCityComponent from '../../components/city/deleteCity';


import './Feature2.css'

const Feature2Component = () => {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.feature2);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteCityId, setDeleteCityId] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchFeature2Data());
        }
    }, [status, dispatch]);

    const handleEditClick = (id) => {
        setSelectedCityId(id);
        setIsUpdateModalOpen(true);
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedCityId(null);
    };

    const handleDeleteClick = (id) => {
        setDeleteCityId(id);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeleteCityId(null);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="feature2-container">
            <h1>Feature 2 Card City Data</h1>
            <button onClick={handleOpenCreateModal}>Create City</button>
            {status === 'succeeded' && (!data || !data.data || data.data.length === 0) ? (
                <div>No data available</div>
            ) : (
                <ul className="city-list">
                    {data && data.data && data.data.map((item, index) => (
                        <li key={item._id} className="city-list-item">
                            {`${index+1}:  ${item.name}`}
                            <div className='button-container'>
                                <button onClick={() => handleEditClick(item._id)} className="edit-button">Edit</button>
                                <button onClick={() => handleDeleteClick(item._id)} className="delete-button">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {/* Render CreateCityComponent inside modal if modal is open */}
            {isCreateModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={handleCloseCreateModal} className="modal-close-button">Close</button>
                        <CreateCityComponent closeModal={handleCloseCreateModal} />
                    </div>
                </div>
            )}
            {/* Render UpdateCityComponent inside modal if selectedCityId is not null */}
            {isUpdateModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={handleCloseUpdateModal} className="modal-close-button">Close</button>
                        <UpdateCityComponent cityId={selectedCityId} closeModal={handleCloseUpdateModal} />
                    </div>
                </div>
            )}
            {isDeleteModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={handleCloseDeleteModal} className="modal-close-button">Close</button>
                        <DeleteCityComponent cityId={deleteCityId} closeModal={handleCloseDeleteModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Feature2Component;
