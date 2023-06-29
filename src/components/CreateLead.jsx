import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CreateLead = ({ visible, onCancel, handleOk }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleOk(form);
  };

  return (
    <Modal
      visible={visible}
      title="Fill Details"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter a name' }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter an address' }]}
        >
          <Input placeholder="Enter address" />
        </Form.Item>
        <Form.Item
          name="profession"
          label="Profession"
          rules={[{ required: true, message: 'Please enter a profession' }]}
        >
          <Input placeholder="Enter profession" />
        </Form.Item>
        <Form.Item
          name="salary"
          label="Salary"
          rules={[{ required: true, message: 'Please enter a salary' }]}
        >
          <Input type='number' placeholder="Enter salary" />
        </Form.Item>
        <Form.Item
          name="loanAmount"
          label="Loan Amount"
          rules={[{ required: true, message: 'Please enter a loan amount' }]}
        >
          <Input type='number' placeholder="Enter loan amount" />
        </Form.Item>
        <Form.Item
          name="mobileNumber"
          label="Mobile Number"
          rules={[
            { required: true, message: 'Please enter a mobile number' },
            {
              pattern: /^[0-9]{10}$/,
              message: 'Please enter a valid 10-digit mobile number',
            },
          ]}
        >
          <Input placeholder="Enter mobile number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateLead;
