import React from 'react';
import { Layout, Menu, Image } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ collapsed, selectedMenuKey, handleMenuClick }) => {
  const menuOptions = [
    {
      key: '1',
      title: 'Dashboard',
      icon: <PieChartOutlined />,
    },
    {
      key: '2',
      title: 'Leads',
      icon: <DesktopOutlined />,
    },
    {
      key: '3',
      title: 'Remainders',
      icon: <FileOutlined />,
    },
  ];

  const getMenuItems = () => {
    return menuOptions.map((option) => (
      <Menu.Item key={option.key} icon={option.icon}>
        {option.title}
      </Menu.Item>
    ));
  };

  return (
    <Sider
      width={200}
      theme="light"
      collapsible
      style={{ backgroundColor: '#2c7cc1' }}
      collapsed={collapsed}
    >
      <div>
        <Image
          width={collapsed ? 50 : 120}
          height={50}
          style={{ marginLeft: 20 }}
          src={!collapsed ? require('../assets/logo.png') : require('../assets/2.png')}
          alt="Image 3"
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{ backgroundColor: '#2c7cc1' }}
        defaultSelectedKeys={[selectedMenuKey]}
        onClick={({ key }) => handleMenuClick(key)}
      >
        {getMenuItems()}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
