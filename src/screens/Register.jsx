import React, { useState } from 'react';
import '../styles/register.css';
import BasicInfo from '../components/steps/BasicInfo';
import AccountInfo from '../components/steps/AccountInfo';
import Password from '../components/steps/Password';

function Register() {
  const [stepper, setStepper] = useState(3);

  const steps = [
    { label: 'Basic Info', component: <BasicInfo  showPrev={false} onNext={() => setStepper(stepper + 1)} /> },
    { label: 'Account Info', component: <AccountInfo prevBtn={() => setStepper(stepper - 1)} showPrev={true} onNext={() => setStepper(stepper + 1)} /> },
    { label: 'Password', component: <Password prevBtn={() => setStepper(stepper - 1)} showPrev={true} onNext={() => setStepper(stepper + 1)} /> },
  ];

  return (
    <div className="App">
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
          <div className="stepper-container">
            {steps.map((step, index) => (
              <div key={index} className={`stepper-step ${index + 1 === stepper ? 'active' : ''}`}>
                <div className="step-number">{index + 1}</div>
                <div className="step-label">{step.label}</div>
              </div>
            ))}
          </div>
          {steps[stepper - 1].component}
        </div>
      </div>
    </div>
  );
}

export default Register;
