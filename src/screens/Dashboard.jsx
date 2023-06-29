import React, { useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Card } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Leads from './Leads';
import { db } from '../screens/firebase'
import { useDispatch } from 'react-redux';
import { logout } from '../config/store/reducer/AuthReducer';
// import { initializeApp } from "firebase-admin/app";

const { Header, Sider, Content } = Layout;

// const serviceAccount = require('../constants/serviceAccountKey.json'); // Replace with the path to your service account JSON file
// initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://lms-spfinnacle.firebaseio.com/'
// });

const Dashboard = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1');

   const fetchUsersData = async () => {
    try {
      const usersRef = db.collection('users');
      const snapshot = await usersRef.get();
  
      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push(doc.data());
      });
        console.log('Error fetching users data:', usersData);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };
  


  useEffect(() => {
    fetchUsersData();
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuOptions = [
    {
      key: '1',
      title: 'Dashboard',
      icon: <PieChartOutlined />,
      content: (
        <>
        <div>
      <Card
        title="Card 1"
        style={{
          background: 'linear-gradient(to right, #667eea, #764ba2)',
          color: 'white',
        }}
      >
        Card 1 Content
      </Card>
      <Card
        title="Card 2"
        style={{
          background: 'linear-gradient(to right, #00b09b, #96c93d)',
          color: 'white',
        }}
      >
        Card 2 Content
      </Card>
      <Card
        title="Card 3"
        style={{
          background: 'linear-gradient(to right, #ff9966, #ff5e62)',
          color: 'white',
        }}
      >
        Card 3 Content
      </Card>
    </div>
        </>
      ),
    },
    {
      key: '2',
      title: 'Leads',
      icon: <DesktopOutlined />,
      content: <Leads />,
    },
    {
      key: '3',
      title: 'Remainders',
      icon: <FileOutlined />,
      content: <h2>Reports Screen</h2>,
    },
  ];

  const handleMenuClick = (key) => {
    setSelectedMenuKey(key);
  };

  const getMenuItems = () => {
    return menuOptions.map((option) => (
      <Menu.Item key={option.key} icon={option.icon}>
        {option.title}
      </Menu.Item>
    ));
  };

  const getCurrentContent = () => {
    const selectedOption = menuOptions.find(
      (option) => option.key === selectedMenuKey
    );
    return selectedOption ? selectedOption.content : null;
  };

  const logoutAction = () => {
    dispatch(logout())
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} key="profile">
        Profile
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} key="logout" onClick={logoutAction}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={200}
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleSidebar}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedMenuKey]}
          onClick={({ key }) => handleMenuClick(key)}
        >
          {getMenuItems()}
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: '0 16px', display: 'flex', alignItems: 'center' }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggleSidebar} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggleSidebar} />
          )}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Dropdown overlay={menu} placement="bottomRight">
              <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>{getCurrentContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
