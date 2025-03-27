import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Shop {
  id: string;
  name: string;
  category: string;
  picture: string;
  address: string;
  latitude: number;
  longitude: number;
}

const Search: React.FC = () => {
  const [data, setData] = useState<Shop[]>([]);
  const [radius, setRadius] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Shop[]>('http://localhost:7000/shops/allShops');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error in fetching data');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:7000/shops/deleteShop/${id}`);
      console.log('Shop deleted');
      alert('Shop deleted');
      setData(prevData => prevData.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting shop:', error);
      alert('Error in deleting shop');
    }
  };

  const handleFetchNearby = async () => {
    if (!radius) {
      alert('Please enter a radius');
      return;
    }

    const userLocation = { latitude: 11.0168, longitude: 76.9558 }; 

    try {
      const response = await axios.get<Shop[]>(`http://localhost:7000/shops/nearby?radius=${radius}&latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching nearby shops:', error);
      alert('Error in fetching nearby shops');
    }
  };

  return (
    <div className='search-table'>
      <div>
        <label className='labels'>Search Shops (km) </label>
        <input
        className='inputs'
          type="number"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        />
        <button className='btn' onClick={handleFetchNearby}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Category</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <img
                  src={item.picture}
                  alt={item.name}
                  style={{ maxWidth: '100px' }}
                />
              </td>
              <td>{item.category}</td>
              <td>{item.address}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
