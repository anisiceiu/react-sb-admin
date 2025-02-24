import React from 'react';
import { useSelector } from 'react-redux';


const Dashboard = () => {

  const authState = useSelector((state) => state.auth);
  

    return (
      <div>
        <h1 className="h3 mb-4 text-gray-800">Dashboard</h1>
        <p>{JSON.stringify(authState)}</p>
      </div>
    );
  };
  
  export default Dashboard;