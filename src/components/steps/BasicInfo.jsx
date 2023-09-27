import React from 'react';

import * as Yup from 'yup';
import G3Form from '../G3Form';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First Name is required')
    .max(50, 'First Name must be at most 50 characters'),
  
  lastName: Yup.string()
    .required('Last Name is required')
    .max(50, 'Last Name must be at most 50 characters'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .max(100, 'Email must be at most 100 characters'),

  mobileNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Mobile Number must contain only digits')
    .min(10, 'Mobile Number must be at least 10 digits')
    .max(15, 'Mobile Number must be at most 15 digits')
    .required('Mobile Number is required'),
});
const BasicInfo = ({onNext, showPrev,prevBtn}) => {

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber:''
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
  )
}

export default BasicInfo
