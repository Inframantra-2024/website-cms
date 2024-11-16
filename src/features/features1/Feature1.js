import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataSuccess, addItem, updateItem, deleteItem } from './feature1Slice';
import './feature1.css';

const Feature1 = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.feature1.data);

  const [newItem, setNewItem] = useState('');
  const [updateId, setUpdateId] = useState(null);
  const [updateName, setUpdateName] = useState('');

  // Load data from local storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('feature1Data'));
    if (storedData) {
      dispatch(fetchDataSuccess(storedData));
    }
  }, [dispatch]);

  // Save data to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('feature1Data', JSON.stringify(data));
  }, [data]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const id = data.length ? data[data.length - 1].id + 1 : 1;
      dispatch(addItem({ id, name: newItem }));
      setNewItem('');
    }
  };

  const handleEditItem = (item) => {
    setUpdateId(item.id);
    setUpdateName(item.name);
  };

  const handleUpdateItem = () => {
    if (updateName.trim()) {
      dispatch(updateItem({ id: updateId, name: updateName }));
      setUpdateId(null);
      setUpdateName('');
    }
  };

  const handleCancelUpdate = () => {
    setUpdateId(null);
    setUpdateName('');
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div className="feature1-container">
      <h1>Feature 1</h1>
      <ul className="feature1-list">
        {data.map((item) => (
          <li key={item.id}>
            {item.name}
            <div>
              <button onClick={() => handleEditItem(item)}>Edit</button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="feature1-input-container">
        <input
          type="text"
          placeholder="New Item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      {updateId !== null && (
        <div className="feature1-update-container">
          <input
            type="text"
            placeholder="Update Item"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />
          <button onClick={handleUpdateItem}>Update Item</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Feature1;
