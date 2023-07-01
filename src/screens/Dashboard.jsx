import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../config/store/reducer/AuthReducer';
import { db } from '../screens/firebase';
import '../styles/dashboard.css';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/AppHeader';
import ContentSection from '../components/ContentSection';

const { Header, Content } = Layout;

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

  const handleMenuClick = (key) => {
    setSelectedMenuKey(key);
  };

  const logoutAction = () => {
    dispatch(logout());
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} selectedMenuKey={selectedMenuKey} handleMenuClick={handleMenuClick} />
      <Layout>
        <AppHeader logoutAction={logoutAction} />
        <ContentSection selectedMenuKey={selectedMenuKey} />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
