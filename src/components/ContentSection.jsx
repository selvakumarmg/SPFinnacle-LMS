import React from 'react';
import { Layout } from 'antd';
import Home from '../screens/Home';
import Leads from '../screens/Leads';
import ReminderList from '../screens/RemainderList';
import Telecallers from './TeleCallers';


const { Content } = Layout;

const ContentSection = ({ selectedMenuKey }) => {
  const renderContent = () => {
    switch (selectedMenuKey) {
      case '1':
        return <Home />;
      case '2':
        return <Leads />;
      case '3':
        return <ReminderList />;
      case '4':
        return <Telecallers />;
      default:
        return null;
    }
  };

  return (
    <Content style={{ margin: '24px 16px 0' }}>
      {renderContent()}
    </Content>
  );
};

export default ContentSection;
