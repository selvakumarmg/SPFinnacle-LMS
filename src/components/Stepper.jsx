// src/components/Stepper.js
import React from 'react';

const Stepper = ({ currentStep }) => {
  const steps = ['userInfo', 'accountInfo', 'password'];

  return (
    <div className="flex space-x-4">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`cursor-pointer p-2 rounded-full ${
            index === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
