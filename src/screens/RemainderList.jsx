import React from 'react';
import { List, Card, Typography, Tag } from 'antd';

const { Text } = Typography;

const ReminderList = () => {
  const data = [
    {
      id: 1,
      name: 'Lead A',
      email: 'leadA@example.com',
      status: 'New',
    },
    {
      id: 2,
      name: 'Lead B',
      email: 'leadB@example.com',
      status: 'Contacted',
    },
    {
      id: 3,
      name: 'Lead C',
      email: 'leadC@example.com',
      status: 'Follow-up',
    },
  ];

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            title={item.name}
            extra={<Tag color={item.status === 'New' ? 'gold' : item.status === 'Contacted' ? 'blue' : 'green'}>{item.status}</Tag>}
          >
            <Text strong>Email:</Text> {item.email}
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ReminderList;
