import React from 'react';
import * as Yup from 'yup';
import G3Form from '../G3Form';

const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Password = ({ onNext, showPrev, prevBtn }) => {
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  return (
    <div>
      <G3Form
        initialValues={initialValues}
        onSubmit={onNext}
        showPrev={showPrev}
        onSubmitBtnLabel='Submit'
        validationSchema={validationSchema}
        prevBtn={prevBtn}
      />
    </div>
  );
};

export default Password;
