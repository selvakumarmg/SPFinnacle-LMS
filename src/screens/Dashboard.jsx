import React, { useState } from 'react';
import { Layout, Card, Table, Badge, Button, Modal, Form, Input, Grid, Row, Col, message } from 'antd';
import '../styles/dashboard.css';
import AppHeader from '../components/AppHeader';

const { Content } = Layout;

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [leads, setLeads] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    // Add lead to the list
    const newLead = {
      key: leads.length + 1,
      ...values,
      status: 'Pending',
    };
    setLeads([...leads, newLead]);
    message.success('Lead created successfully');
    handleCancel();
    form.resetFields();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Profession',
      dataIndex: 'profession',
      key: 'profession',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Loan Amount',
      dataIndex: 'loanAmount',
      key: 'loanAmount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Badge color={status === 'Pending' ? 'orange' : 'green'} text={status} />,
    },
  ];

  return (
    <Layout>
      <AppHeader />
      <Content className="dashboard-content">
        <div className="site-layout-content">
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <Card title="Total Leads" className="dashboard-card">
                {leads.length}
              </Card>
            </Col>
            <Col span={4}>
              <Card title="Pending" className="dashboard-card">
                0
              </Card>
            </Col>
            <Col span={4}>
              <Card title="Completed" className="dashboard-card">
                0
              </Card>
            </Col>
          </Row>
        </div>

        <Button type="primary" onClick={showModal} style={{ marginTop: '20px', marginBottom: '20px',position:'absolute', right:40 }}>
  Create Lead
</Button>



        <Modal
          title="Create Lead"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleFormSubmit}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter the name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter the email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="mobile"
              label="Mobile Number"
              rules={[{ required: true, message: 'Please enter the mobile number' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter the address' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="profession"
              label="Profession"
              rules={[{ required: true, message: 'Please enter the profession' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="salary"
              label="Salary"
              rules={[{ required: true, message: 'Please enter the salary' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="loanAmount"
              label="Loan Amount"
              rules={[{ required: true, message: 'Please enter the loan amount' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={handleCancel} style={{ marginLeft: '10px' }}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Table style={{marginTop:80}} columns={columns} dataSource={leads} />
      </Content>
    </Layout>
  );
};

export default Dashboard;
