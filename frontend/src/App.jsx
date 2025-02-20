import React, { useState,useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const App = () => {
  const [rooms, setRooms] = useState([]);
  const [startRoom, setStartRoom] = useState('');
  const [endRoom, setEndRoom] = useState('');
  const [path, setPath] = useState([]);

  useEffect(() => {
    // Fetch room names from the JSON file
    fetch('./assets/rooms.json')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching room names:', error));
  }, []);

  const fetchPath = async () => {
    if (!startRoom || !endRoom) {
      alert('Please select both start and end rooms.');
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/shortest_path?start=${startRoom}&end=${endRoom}`
      );
      setPath(response.data);
    } catch (error) {
      console.error('Error fetching path:', error);
      setPath(['No path found']);
    }
  };

  return (
    <div>
      <label>
        Start Room:
        <select value={startRoom} onChange={e => setStartRoom(e.target.value)}>
          <option value="">Select a room</option>
          {rooms.map(room => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        End Room:
        <select value={endRoom} onChange={e => setEndRoom(e.target.value)}>
          <option value="">Select a room</option>
          {rooms.map(room => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={fetchPath}>Find Route</button>
      <h3>Shortest Path:</h3>
      <ul>
        {path.map((room, index) => (
          <li key={index}>{room}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
