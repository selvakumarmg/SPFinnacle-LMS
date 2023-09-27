import React from 'react';
import { Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const OTPVerificationStep = ({ userData, errors, handleInputChange, handleGetOTP, handleResendOTP }) => (
  <>
    <Typography.Text strong>Mobile Number: {userData.phone}</Typography.Text>
    <Input
      name="otp"
      prefix={<LockOutlined />}
      placeholder="OTP"
      value={userData.otp}
      onChange={handleInputChange}
      error={errors.otp}
      style={{ marginTop: '8px' }}
    />
    <Button
      type="primary"
      onClick={handleGetOTP}
      style={{ marginTop: '8px', backgroundColor: '#6366f1' }}
      disabled={userData.resendDisabled}
    >
      Resend OTP{userData.resendDisabled ? ` (${userData.timer}s)` : ''}
    </Button>
  </>
);

export default OTPVerificationStep;
