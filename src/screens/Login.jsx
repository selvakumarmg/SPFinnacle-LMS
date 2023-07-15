import React, { useState } from 'react';
import { Card, Input, Button, Form, Image } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onFinish = (values) => {

    // setShowError(true);
    // console.log('Received values:', values);
    // setTimeout(() => {
    //   setShowError(false);
    // }, 3000);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <img src={require('../assets/bg-login.png')} />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        {/* Right side with red background */}
        <Card title="Login" style={{ width: 400 }}>
          <Form onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                style={{ fontSize: '16px' }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                style={{ fontSize: '16px' }}
              />
            </Form.Item>
            {showError && (
              <Form.Item>
                <p style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>
                  Error: Invalid username or password.
                </p>
              </Form.Item>
            )}
            <Form.Item>
              <Button className="bg-blue-500" type="primary" htmlType="submit" block>
                Log in
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: 'center', fontSize: '14px' }}>
            <p>
              Don't have an account?{' '}
              <a href="/signup" style={{ color: 'blue' }}>
                Sign up
              </a>
            </p>
          </div>
          <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '20px' }}>
            &copy; SPFINNACLE. All rights reserved.
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
