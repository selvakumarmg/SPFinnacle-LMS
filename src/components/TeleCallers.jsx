import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Telecallers = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', phone: '1234567890' },
    { id: 2, name: 'Jane Smith', phone: '9876543210' },
    { id: 3, name: 'Bob Johnson', phone: '4567890123' },
  ]);

  const [editVisible, setEditVisible] = useState(false);
  const [selectedTelecaller, setSelectedTelecaller] = useState(null);
  const [form] = Form.useForm();

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((telecaller) => telecaller.id !== id));
    message.success('Telecaller deleted successfully.');
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      setData((prevData) =>
        prevData.map((telecaller) =>
          telecaller.id === selectedTelecaller.id ? { ...telecaller, ...values } : telecaller
        )
      );
      message.success('Telecaller updated successfully.');
      handleCancel();
    });
  };

  const handleCancel = () => {
    setEditVisible(false);
    form.resetFields();
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedTelecaller(record);
              setEditVisible(true);
              form.setFieldsValue(record);
            }}
            style={{ marginRight: 8 }}
            type="link"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            type="link"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={data} columns={columns} rowKey="id" />

      <Modal
        title="Update Telecaller"
        visible={editVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter a phone number' }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
          <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default Telecallers;
