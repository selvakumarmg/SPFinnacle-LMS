import React, { useEffect, useState } from 'react';
import '../styles/PendingApplications.css'; // Import the CSS file
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from './firebase';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';

const PendingApplications = () => {
  const userDetails = useSelector((state) => state.AuthReducer.userDetails);

  const location = useLocation();
  const { state: existingUser } = location;

  const [pendingApplications, setPendingApplications] = useState('');

  useEffect(() => {
    const { uid } = userDetails;

    getUserCollectionData(uid)
      .then((result) => {
        if (result) {
          const { userCollectionData, status } = result;
          setPendingApplications(userCollectionData);
        } else {
          console.log('User collection not found.');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);


async function getUserCollectionData(uid) {
  try {
    const userCollectionsRef = collection(db, 'users');
    const q = query(userCollectionsRef, where('uid', '==', uid));
    const userCollectionsSnapshot = await getDocs(q);

    if (!userCollectionsSnapshot.empty) {
      const userCollectionData = userCollectionsSnapshot.docs[0].data();
      const status = userCollectionData.status;

      return { userCollectionData, status };
    }

    return null; // User collection not found
  } catch (error) {
    console.log('Error fetching user collection data:', error);
    return null;
  }
}


  return (
    <div className="pending-applications">
      <h2>Pending Applications</h2>
      <div className="pending-application">
            <h3 className="application-id">Application ID: {pendingApplications.uniqueId}</h3>
            <p className="name">Name: {pendingApplications.name}</p>
            <p className="email">Email: {pendingApplications.email}</p>
            <span className="status">
              The application requires additional verification or validation of the provided information, documents, or
              credentials. The pending status indicates that the necessary checks or validations are still in progress.
            </span>
          </div>
    </div>
  );
};

export default PendingApplications;
