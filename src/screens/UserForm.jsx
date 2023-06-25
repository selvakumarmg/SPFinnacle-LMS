import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthStatus, setUserDetails } from '../config/store/reducer/AuthReducer';
import { db } from './firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';


const SignupForm = ({ onFinish }) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const { uid,email,displayName,photoURL} = location.state;

  const handleSubmit = (values) => {
    const {name,phoneNumber } = values;
    values = {uid,email,name,photoURL,phoneNumber}
    onFinish(values);
  };

  return (
    <Form form={form} initialValues={{name:displayName,phoneNumber:''}} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: 'Please enter your phone number' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const OtpVerificationPage = ({ onVerify }) => {
  const [otp, setOtp] = useState('1234');

  const handleVerify = () => {
    if (otp === '1234') {
      onVerify();
    } else {
      message.error('Invalid OTP');
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <p>Please enter the OTP sent to your phone number.</p>
      <Input
        style={{ width: '200px' }}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button type="primary" onClick={handleVerify}>
        Verify
      </Button>
    </div>
  );
};

const UserForm = () => {
    const dispatch = useDispatch();
  const [showOtpPage, setShowOtpPage] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({})

  const handleSignupFinish = (values) => {
    // Perform API call or any other signup logic
    console.log('Signup values:', values);
    setUser(values)
    setShowOtpPage(true);
  };

  function generateUniqueId() {
    const prefix = 'SPFIN';
    const randomId = Math.floor(10000000 + Math.random() * 90000000); // Generate a random 8-digit number
    const uniqueId = prefix + randomId.toString().substring(0, 8); // Append prefix and take the first 8 digits
  
    return uniqueId;
  }

  const handleCreateUser = async () => {
    try {
      const uniqueId = generateUniqueId();
      setUser({...user, custID:uniqueId,status:'pending'})
      await addDoc(collection(db, "users"), {...user,uniqueId,status:'pending'});
      
      message.success('User created successfully!' + uniqueId);
      dispatch(setAuthStatus(true));
    dispatch(setUserDetails(user));
    navigate('/pending-action')
    } catch (error) {
        console.log('Error creating user:', error);
        console.error('Error creating user:', error);
    }
  };

  const handleOtpVerify = () => {
    // Handle successful OTP verification
    message.success('OTP verification successful');
    setShowOtpPage(false);
    handleCreateUser();
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Continue with user details</h1>
      {!showOtpPage ? (
        <SignupForm onFinish={handleSignupFinish} />
      ) : (
        <OtpVerificationPage user={user} onVerify={handleOtpVerify} />
      )}
    </div>
  );
};

export default UserForm;
