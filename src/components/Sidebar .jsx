import React from 'react';
import { Menu } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined } from '@ant-design/icons';

const Sidebar = ({ collapsed, selectedMenuKey, handleMenuClick }) => {
  const menuOptions = [
    { key: '1', title: 'Dashboard', icon: <PieChartOutlined /> },
    { key: '2', title: 'Devices', icon: <DesktopOutlined /> },
    { key: '3', title: 'Reports', icon: <FileOutlined /> },
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[selectedMenuKey]}
      onClick={({ key }) => handleMenuClick(key)}
    >
      {menuOptions.map((option) => (
        <Menu.Item key={option.key} icon={option.icon}>
          {option.title}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Sidebar;
