import React from 'react';
import { Row, Col, Card, Typography, Progress } from 'antd';
import MonthlyChart from '../components/MonthlyChart';

const { Title, Text } = Typography;

const Home = () => {
  const leadsCount = 50;
  const monthlyTarget = 80;
  const achievements = 70;
  
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [50, 60, 40, 70, 65, 80],
        fill: false,
        backgroundColor: '#1890ff',
        borderColor: '#1890ff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Title level={4}>Leads Count</Title>
            <Text strong>{leadsCount}</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Title level={4}>Monthly Target</Title>
            <Text strong>{monthlyTarget}</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Title level={4}>Achievements</Title>
            <Progress percent={achievements} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Title level={4}>Loan Process Offers</Title>
            <Text strong>Coming soon...</Text>
          </Card>
        </Col>
      </Row>
      
    </div>
  );
};

export default Home;
