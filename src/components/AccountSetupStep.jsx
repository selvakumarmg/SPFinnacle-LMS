import React from 'react';
import { Input, Checkbox } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const AccountSetupStep = ({ userData, errors, handleInputChange, handleCheckboxChange }) => (
  <>
    <Input.Password
      name="password"
      prefix={<LockOutlined />}
      placeholder="New Password"
      value={userData.password}
      onChange={handleInputChange}
      error={errors.password}
      style={{ marginTop: '8px' }}
    />
    <Input.Password
      name="confirmPassword"
      prefix={<LockOutlined />}
      placeholder="Confirm Password"
      value={userData.confirmPassword}
      onChange={handleInputChange}
      error={errors.confirmPassword}
      style={{ marginTop: '8px' }}
    />
    <Checkbox
      name="termsChecked"
      checked={userData.termsChecked}
      onChange={handleCheckboxChange}
      style={{ marginTop: '8px' }}
      error={errors.termsChecked}
    >
      I agree to the Terms and Conditions
    </Checkbox>
  </>
);

export default AccountSetupStep;
