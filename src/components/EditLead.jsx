import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const EditLead = ({ form, handleUpdate, handleCancel, selectedLead }) => {
  return (
    <Form form={form} onFinish={handleUpdate}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: 'Please enter name' },
          { pattern: /^[a-zA-Z\s]*$/, message: 'Only alphabets and spaces are allowed' },
        ]}
        initialValue={selectedLead.name}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[
          { required: true, message: 'Please enter address' },
        ]}
        initialValue={selectedLead.address}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="profession"
        label="Profession"
        rules={[
          { required: true, message: 'Please enter profession' },
        ]}
        initialValue={selectedLead.profession}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="salary"
        label="Salary"
        rules={[
          { required: true, message: 'Please enter salary' },
          { pattern: /^\d+(\.\d{1,2})?$/, message: 'Please enter a valid salary amount' },
        ]}
        initialValue={selectedLead.salary}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="loanAmount"
        label="Loan Amount"
        rules={[
          { required: true, message: 'Please enter loan amount' },
          { pattern: /^\d+(\.\d{1,2})?$/, message: 'Please enter a valid loan amount' },
        ]}
        initialValue={selectedLead.loanAmount}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="mobileNumber"
        label="Mobile Number"
        rules={[
          { required: true, message: 'Please enter mobile number' },
          { pattern: /^[0-9]*$/, message: 'Only numbers are allowed' },
        ]}
        initialValue={selectedLead.mobileNumber}
      >
        <Input />
      </Form.Item>
      <Button onClick={handleCancel} style={{ marginRight: 8 }}>
        Cancel
      </Button>
      <Button type="primary" htmlType="submit">
        Update
      </Button>
    </Form>
  );
};

export default EditLead;
