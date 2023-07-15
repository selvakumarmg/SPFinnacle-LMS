import React, { useState } from 'react';
import { Steps, Button, Typography, Input, Checkbox, Select, Upload } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined, UploadOutlined } from '@ant-design/icons';

const { Step } = Steps;
const { Option } = Select;

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    otp: '',
    address: '',
    profession: '',
    gender: '',
    pancard: '',
    password: '',
    confirmPassword: '',
    termsChecked: false,
    panFile: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = ['User Info', 'Additional Details', 'Account Setup'];

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: checked }));
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFileUpload = (file) => {
    setUserData((prevUserData) => ({ ...prevUserData, panFile: file }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Handle form submission logic here
      console.log(userData);
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    switch (activeStep) {
      case 0:
        if (!userData.username) {
          newErrors.username = 'Username is required';
          formIsValid = false;
        }
        if (!userData.email) {
          newErrors.email = 'Email is required';
          formIsValid = false;
        }
        if (!userData.phone) {
          newErrors.phone = 'Phone Number is required';
          formIsValid = false;
        }
        if (!userData.otp) {
          newErrors.otp = 'OTP is required';
          formIsValid = false;
        }
        break;
      case 1:
        if (!userData.address) {
          newErrors.address = 'Address is required';
          formIsValid = false;
        }
        if (!userData.profession) {
          newErrors.profession = 'Profession is required';
          formIsValid = false;
        }
        if (!userData.gender) {
          newErrors.gender = 'Gender is required';
          formIsValid = false;
        }
        if (!userData.pancard) {
          newErrors.pancard = 'PAN Card Number is required';
          formIsValid = false;
        }
        if (!userData.panFile) {
          newErrors.panFile = 'PAN Card upload is required';
          formIsValid = false;
        }
        break;
      case 2:
        if (!userData.password) {
          newErrors.password = 'New Password is required';
          formIsValid = false;
        }
        if (!userData.confirmPassword) {
          newErrors.confirmPassword = 'Confirm Password is required';
          formIsValid = false;
        }
        if (userData.password !== userData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
          formIsValid = false;
        }
        if (!userData.termsChecked) {
          newErrors.termsChecked = 'You must agree to the Terms and Conditions';
          formIsValid = false;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Input
              name="username"
              prefix={<UserOutlined />}
              placeholder="Username"
              value={userData.username}
              onChange={handleInputChange}
              required
              error={!!errors.username}
              helperText={errors.username}
              style={{ marginTop: '8px' }}
            />
            <Input
              name="email"
              prefix={<MailOutlined />}
              placeholder="Email"
              value={userData.email}
              onChange={handleInputChange}
              required
              error={!!errors.email}
              helperText={errors.email}
              style={{ marginTop: '8px' }}
            />
            <Input
              name="phone"
              prefix={<PhoneOutlined />}
              placeholder="Phone Number"
              value={userData.phone}
              onChange={handleInputChange}
              required
              error={!!errors.phone}
              helperText={errors.phone}
              style={{ marginTop: '8px' }}
            />
            {/* Add OTP validation logic */}
            <Input
              name="otp"
              prefix={<LockOutlined />}
              placeholder="OTP"
              value={userData.otp}
              onChange={handleInputChange}
              required
              error={!!errors.otp}
              helperText={errors.otp}
              style={{ marginTop: '8px' }}
            />
            <Button type="primary" onClick={handleGetOTP} style={{ marginTop: '8px' }}>
              Get OTP
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <Input
              name="address"
              prefix={<UserOutlined />}
              placeholder="Address"
              value={userData.address}
              onChange={handleInputChange}
              required
              error={!!errors.address}
              helperText={errors.address}
              style={{ marginTop: '8px' }}
            />
            <Input
              name="profession"
              prefix={<UserOutlined />}
              placeholder="Profession"
              value={userData.profession}
              onChange={handleInputChange}
              required
              error={!!errors.profession}
              helperText={errors.profession}
              style={{ marginTop: '8px' }}
            />
            <Select
              name="gender"
              prefix={<UserOutlined />}
              placeholder="Gender"
              value={userData.gender}
              onChange={(value) => handleInputChange({ target: { name: 'gender', value } })}
              required
              error={!!errors.gender}
              style={{ marginTop: '8px', width: '100%' }}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
            <Input
              name="pancard"
              prefix={<UserOutlined />}
              placeholder="PAN Card Number"
              value={userData.pancard}
              onChange={handleInputChange}
              required
              error={!!errors.pancard}
              helperText={errors.pancard}
              style={{ marginTop: '8px' }}
            />
            {/* Add PAN Card image and PDF upload components */}
            <Upload
              name="panFile"
              beforeUpload={() => false}
              fileList={userData.panFile ? [userData.panFile] : []}
              onChange={({ file }) => handleFileUpload(file)}
              required
              error={!!errors.panFile}
              style={{ marginTop: '8px' }}
            >
              <Button icon={<UploadOutlined />}>Upload PAN Card (Image/PDF)</Button>
            </Upload>
          </>
        );
      case 2:
        return (
          <>
            <Input.Password
              name="password"
              prefix={<LockOutlined />}
              placeholder="New Password"
              value={userData.password}
              onChange={handleInputChange}
              required
              error={!!errors.password}
              helperText={errors.password}
              style={{ marginTop: '8px' }}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            />
            <Input.Password
              name="confirmPassword"
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              value={userData.confirmPassword}
              onChange={handleInputChange}
              required
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              style={{ marginTop: '8px' }}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            />
            <Checkbox
              name="termsChecked"
              checked={userData.termsChecked}
              onChange={handleCheckboxChange}
              style={{ marginTop: '8px' }}
            >
              I agree to the{' '}
              <a
                href="https://example.com/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>
            </Checkbox>
          </>
        );
      default:
        return null;
    }
  };

  const handleGetOTP = () => {
    // Implement logic to get the OTP
    console.log('Getting OTP...');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-112 bg-white rounded-lg shadow p-8">
        <Steps current={activeStep} size="small">
          {steps.map((label) => (
            <Step key={label} title={label} />
          ))}
        </Steps>
        <div className="mt-8">
          {activeStep === steps.length ? (
            <>
              <Typography.Title level={5} align="center">
                Registration Successful!
              </Typography.Title>
              {/* Add success message or redirect logic */}
            </>
          ) : (
            <form onSubmit={handleFormSubmit}>
              {renderStepContent(activeStep)}
              <div className="flex justify-between mt-8">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  type="default"
                  shape="round"
                  className="rounded-full"
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleNext}
                  style={{ borderRadius: '10px', backgroundColor: '#6366f1' }}
                >
                  {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
