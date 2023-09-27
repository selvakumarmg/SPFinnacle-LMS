import React from 'react';
import { Layout, Avatar, Dropdown, Badge, Menu } from 'antd';
import { UserOutlined, LogoutOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = ({ toggleSidebar,logoutAction }) => {
  const messageList = [
    { id: 1, title: 'Message 1', isRead: false },
    { id: 2, title: 'Message 2', isRead: true },
    { id: 3, title: 'Message 3', isRead: false },
  ];

  const unreadMessages = messageList.filter((message) => !message.isRead);

  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} key="profile">
        Profile
      </Menu.Item>
      <Menu.Item icon={<MessageOutlined />} key="inbox">
        Inbox
      </Menu.Item>
      {unreadMessages.length > 0 && (
        <Menu.SubMenu title={`Unread Messages (${unreadMessages.length})`}>
          {unreadMessages.map((message) => (
            <Menu.Item key={message.id}>{message.title}</Menu.Item>
          ))}
        </Menu.SubMenu>
      )}
      <Menu.Item icon={<LogoutOutlined />} key="logout" onClick={logoutAction}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-sub-header-background" style={{ padding: '0 16px', display: 'flex', alignItems: 'center', backgroundColor: '#2c7cc1' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Dropdown overlay={menu} placement="bottomRight">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {unreadMessages.length > 0 && (
              <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} icon={<UserOutlined />} />
            )}
            
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
