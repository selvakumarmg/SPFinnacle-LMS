import React from 'react';
import * as Yup from 'yup';
import G3Form from '../G3Form';

const validationSchema = Yup.object({
  address: Yup.string()
    .required('Address is required'),

  city: Yup.string()
    .required('City is required'),

  pincode: Yup.string()
    .matches(/^[0-9]+$/, 'Pincode must contain only digits')
    .min(6, 'Pincode must be at least 6 digits')
    .max(10, 'Pincode must be at most 10 digits')
    .required('Pincode is required'),

  pancard: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN Card format')
    .required('PAN Card is required'),
});

const AccountInfo = ({ onNext, showPrev,prevBtn }) => {
  const initialValues = {
    address: '',
    city: '',
    pincode: '',
    pancard: '',
  };

  return (
    <div>
      <G3Form
        initialValues={initialValues}
        onSubmit={onNext}
        showPrev={showPrev}
        onSubmitBtnLabel='Next'
        validationSchema={validationSchema}
       prevBtn={prevBtn}

      />
    </div>
  );
};

export default AccountInfo;
