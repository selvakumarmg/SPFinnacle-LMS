import React from 'react';
import { Modal, Form, Input, message } from 'antd';

const CreateLead = ({ visible, handleOk, onCancel, leads }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      const duplicateLead = leads.find((lead) => lead.mobileNumber === values.mobileNumber);
      if (duplicateLead) {
        message.error('Mobile number already exists. Please enter a unique mobile number.');
      } else {
        handleOk(form, values);
      }
    });
  };

  return (
    <Modal
      title="New Lead"
      visible={visible}
      onCancel={onCancel}
      onOk={handleFormSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the name.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter the address.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Profession"
          name="profession"
          rules={[{ required: true, message: 'Please enter the profession.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Salary"
          name="salary"
          rules={[{ required: true, message: 'Please enter the salary.' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Loan Amount"
          name="loanAmount"
          rules={[{ required: true, message: 'Please enter the loan amount.' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Mobile Number"
          name="mobileNumber"
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
