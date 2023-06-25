import React, { useEffect, useState } from 'react';
import '../styles/PendingApplications.css'; // Import the CSS file

const PendingApplications = () => {
  const [pendingApplications, setPendingApplications] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      status: 'pending',
    },
  ]);

  return (
    <div className="pending-applications">
      <h2>Pending Applications</h2>
      {pendingApplications.length > 0 ? (
        pendingApplications.map((application) => (
          <div className="pending-application" key={application.id}>
            <h3 className="application-id">Application ID: {application.id}</h3>
            <p className="name">Name: {application.name}</p>
            <p className="email">Email: {application.email}</p>
            <span className="status">
              The application requires additional verification or validation of the provided information, documents, or
              credentials. The pending status indicates that the necessary checks or validations are still in progress.
            </span>
          </div>
        ))
      ) : (
        <p>No pending applications</p>
      )}
    </div>
  );
};

export default PendingApplications;
