import React from 'react';
import { Layout, Avatar, Menu, Dropdown, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import '../styles/dashboard.css'

const { Header } = Layout;

const imgURL = 'data:image/png;base64,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'

const UserMenu = (
  <Menu>
    <Menu.Item key="1" icon={<UserOutlined />}>
      Profile
    </Menu.Item>
    <Menu.Item key="2" icon={<LogoutOutlined />}>
      Logout
    </Menu.Item>
  </Menu>
);

const AppHeader = () => {
  const user = useSelector((state) => state.AuthReducer.userDetails);
  console.log("User", user)
  return (
    <Header className="header">
      <div className="logo" />
      <div className="user-info">
        <Avatar src={user.photoURL ?? imgURL} style={{height:30,width:30}} />
        <Dropdown overlay={UserMenu} placement="bottomRight">
          <span className="username">{user.name}</span>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
