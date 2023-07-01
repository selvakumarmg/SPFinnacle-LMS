import React from 'react';
import { Modal, Form, Input } from 'antd';

const LeadDetailsModal = ({ selectedLead, visible, onCancel }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  // Set the initial form values based on the selectedLead
  React.useEffect(() => {
    form.setFieldsValue(selectedLead);
  }, [selectedLead, form]);

  return (
    <Modal
      title="Lead Details"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Lead ID" name="leadId">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Profession" name="profession">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Salary" name="salary">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Loan Amount" name="loanAmount">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LeadDetailsModal;
