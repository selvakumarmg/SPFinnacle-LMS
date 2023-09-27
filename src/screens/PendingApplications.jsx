import React, { useEffect, useState } from 'react';
import '../styles/PendingApplications.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { postApiCall } from '../config/api';
import { setUserDetails } from '../config/store/reducer/AuthReducer';
import { message } from 'antd';
import { Button } from '@mui/material';

const PendingApplications = () => {
  const userDetails = useSelector((state) => state.AuthReducer.userDetails);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [pendingApplications, setPendingApplications] = useState('');

  const getAgentDetails = async (agentId) => {
    console.log("agentId", agentId)
    try {
      const res = await postApiCall('agents/getdetails', {agentId});
      const {status, data} = res;
      if(status === 200){
        dispatch(setUserDetails(data));
        if(data.status !== 'pending'){
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error("error", error)
      // alert.error('Login error:', error.message);
    }
  };

  useEffect(() => {
    getAgentDetails(userDetails.id)
  }, []);

  return (
    <div className="pending-applications">
      <h2>Pending Applications</h2>
      <div className="pending-application">
            <h3 className="application-id">Application ID: {pendingApplications.uniqueId}</h3>
            <p className="name">Name: {userDetails.username}</p>
            <p className="email">Email: {userDetails.email}</p>
            <span className="status">
              The application requires additional verification or validation of the provided information, documents, or
              credentials. The pending status indicates that the necessary checks or validations are still in progress.
            </span>
          </div>
          <Button onClick={()=> getAgentDetails(userDetails.id)}>Check Status</Button>
    </div>
  );
};

export default PendingApplications;
