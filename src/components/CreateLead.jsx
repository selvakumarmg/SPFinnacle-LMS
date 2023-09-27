import React from 'react';
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const banks = [
  { id: 1, name: 'State Bank of India' },
  { id: 2, name: 'HDFC Bank' },
  { id: 3, name: 'ICICI Bank' },
  { id: 4, name: 'Axis Bank' },
  { id: 5, name: 'Punjab National Bank' },
  { id: 6, name: 'Bank of Baroda' },
  { id: 7, name: 'Canara Bank' },
  { id: 8, name: 'Union Bank of India' },
  { id: 9, name: 'Indian Bank' },
  { id: 10, name: 'Bank of India' },
  // Add more banks as needed
];

const CreateLead = ({ visible, handleOk, onCancel, leads }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      await form.validateFields();
      handleOk(form, values);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Create New Lead"
      visible={visible}
      onOk={handleFinish}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please enter the first name' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter the last name' }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="mobileNumber"
          label="Mobile No"
          rules={[
            { required: true, message: 'Please enter the mobile number' },
            {
              pattern: /^[0-9]{10}$/,
              message: 'Please enter a valid 10-digit mobile number',
            },
          ]}
        >
          <Input placeholder="Mobile No" />
        </Form.Item>
        <Form.Item
          name="companyName"
          label="Company Name"
          rules={[{ required: true, message: 'Please enter the company name' }]}
        >
          <Input placeholder="Company Name" />
        </Form.Item>
        <Form.Item
          name="salary"
          label="Salary"
          rules={[{ required: true, message: 'Please enter the salary' }]}
        >
          <Input placeholder="Salary" />
        </Form.Item>
        <Form.Item label="Address" required>
          <Form.Item
            name="doorNumber"
            rules={[{ required: true, message: 'Please enter the door number' }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input placeholder="Door Number" />
          </Form.Item>
          <Form.Item
            name="street"
            rules={[{ required: true, message: 'Please enter the street' }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
          >
            <Input placeholder="Street" />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please enter the city' }]}
        >
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: 'Please enter the state' }]}
        >
          <Input placeholder="State" />
        </Form.Item>
        <Form.Item
          name="pincode"
          label="Pin Code"
          rules={[{ required: true, message: 'Please enter the pin code' }]}
        >
          <Input placeholder="Pin Code" />
        </Form.Item>
        <Form.Item
          name="loanAmount"
          label="Loan Amount"
          rules={[{ required: true, message: 'Please enter the loan amount' }]}
        >
          <Input placeholder="Loan Amount" />
        </Form.Item>
        <Form.Item
          name="bankName"
          label="Bank Name"
          rules={[{ required: true, message: 'Please select the bank name' }]}
        >
          <Select placeholder="Select Bank Name">
            {banks.map((bank) => (
              <Option key={bank.id} value={bank.name}>
                {bank.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="loanType"
          label="Loan Type"
          rules={[{ required: true, message: 'Please select the loan type' }]}
        >
          <Select placeholder="Select Loan Type">
            <Option value="personalLoan">Personal Loan</Option>
            <Option value="businessLoan">Business Loan</Option>
            <Option value="houseLoan">House Loan</Option>
            <Option value="loanAgainstProperty">Loan Against Property</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>
        {form.getFieldValue('loanType') === 'others' && (
          <Form.Item
            name="otherLoanType"
            label="Other Loan Type"
            rules={[{ required: true, message: 'Please enter the other loan type' }]}
          >
            <Input placeholder="Other Loan Type" />
          </Form.Item>
        )}
        <Form.Item
          name="loanProcessStatus"
          label="Loan Process Status"
          rules={[{ required: true, message: 'Please select the loan process status' }]}
        >
          <Select placeholder="Select Loan Process Status">
            <Option value="fresh">Fresh</Option>
            <Option value="topUp">Top Up</Option>
            <Option value="balanceTransfer">Balance Transfer</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="payslipUpload"
          label="Payslip Upload"
          rules={[{ required: true, message: 'Please upload payslips' }]}
        >
          <Upload
            name="payslipUpload"
            accept=".jpg,.jpeg,.png,.pdf"
            multiple={true}
            maxCount={3}
            beforeUpload={() => false}
          >
            <Button icon={<PlusOutlined />} style={{ width: '100%' }}>
              Upload Payslips
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateLead;
