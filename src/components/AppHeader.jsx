import React from 'react';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = ({ collapsed, toggleSidebar }) => {
  return (
    <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
      {collapsed ? (
        <MenuUnfoldOutlined className="trigger" onClick={toggleSidebar} />
      ) : (
        <MenuFoldOutlined className="trigger" onClick={toggleSidebar} />
      )}
    </Header>
  );
};

export default AppHeader;
