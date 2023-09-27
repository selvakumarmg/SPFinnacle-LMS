import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Modal, Form, Input, message as alert, Spin } from 'antd';
import { EyeOutlined, EditOutlined, PlusOutlined, DeleteFilled, SyncOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import CreateLead from '../components/CreateLead';
import LeadDetailsModal from '../components/LeadDetailsModal';
import EditLead from '../components/EditLead';
import { get } from '../config/api';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Paper, Typography } from '@mui/material';

const Leads = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [leadVisible, setLeadVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [searchText, leads]);

  const fetchLeads = async () => {
    setLoading(true);

    try {
      const res = await get(`leads/1`);
      const { status, message, data } = res;
      if (status === 200) {
        setLeads(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert.error('Login error:', error.message);
    }
  };

  const filterLeads = () => {
    if (!leads) {
      // If leads is undefined or null, set an empty array as filteredLeads
      setFilteredLeads([]);
      return;
    }

    const filteredLeads = leads.filter((lead) => {
      // Check if the properties are defined before accessing them
      const mobileNumber = lead.mobileNumber ? lead.mobileNumber.toLowerCase() : '';
      return mobileNumber.includes(searchText.toLowerCase());
    });

    setFilteredLeads(filteredLeads);
  };

  const handleCancel = () => {
    setVisible(false);
    setLeadVisible(false);
    form.resetFields();
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      // Update logic (for demonstration)
      console.log('Update lead:', values);
      alert.success('Lead updated successfully.');
      handleCancel();
    } catch (error) {
      console.error('Error updating lead: ', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'approved':
        return 'green';
      case 'inprogress':
        return 'blue';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'fresh':
        return <ClockCircleOutlined />;
      case 'topup':
        return <CheckCircleOutlined />;
      case 'inprogress':
        return <SyncOutlined spin />;
      default:
        return '';
    }
  };

  const handleOk = async (form, values) => {
    form.validateFields().then((values) => {
      // Create logic (for demonstration)
      console.log('Create lead:', values);
      alert.success('Lead created successfully.');
      handleCancel();
    });
  };

  const handleDelete = async (record) => {
    // Delete logic (for demonstration)
    console.log('Delete lead:', record);
    alert.success('Lead deleted successfully.');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Phone Number',
      dataIndex: 'mobile_no',
      key: 'mobile_no',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Loan Amount',
      dataIndex: 'loan_amount',
      key: 'loan_amount',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedLead(record);
              setVisible(true);
            }}
            style={{ marginRight: 8 }}
            type="link"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedLead(record);
              setEditVisible(true);
              form.setFieldsValue(record);
            }}
            type="link"
          />
          <Button
            icon={<DeleteFilled />}
            onClick={() => {
              handleDelete(record);
            }}
            type="link"
          />
        </div>
      ),
    },
  ];

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  // Function to handle row expansion
  const handleExpand = (expanded, record) => {
    const newExpandedRowKeys = expanded
      ? [...expandedRowKeys, record.id]
      : expandedRowKeys.filter((key) => key !== record.id);

    setExpandedRowKeys(newExpandedRowKeys);
  };

  const renderExpandedRow = (record) => {
    return (
      <Paper elevation={0} style={{ padding: 16, backgroundColor: '#BDBDBD' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold',color: '#0047AB',fontSize:12 }}>First Name:</Typography>
            <p>{record.first_name}</p>
          </div>
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold',color: '#0047AB',fontSize:12 }}>Last Name:</Typography>
            <p>{record.last_name}</p>
          </div>
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold',color: '#0047AB',fontSize:12 }}>Phone Number:</Typography>
            <p>{record.mobile_no}</p>
          </div>
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold',color: '#0047AB',fontSize:12 }}>Company Name:</Typography>
            <p>{record.company_name}</p>
          </div>
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold',color: '#0047AB',fontSize:12 }}>Salary:</Typography>
            <p>{record.salary}</p>
          </div>
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold',color: '#0047AB',fontSize:12 }}>Door Number:</Typography>
            <p>{record.door_number}</p>
          </div>
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold',color: '#0047AB',fontSize:12 }}>Street:</Typography>
            <p>{record.street}</p>
          </div>
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold',color: '#0047AB',fontSize:12 }}>City:</Typography>
            <p>{record.city}</p>
          </div>
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold',color: '#0047AB',fontSize:12 }}>State:</Typography>
            <p>{record.state}</p>
          </div>
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold',color: '#0047AB',fontSize:12 }}>Pin Code:</Typography>
            <p>{record.pin_code}</p>
          </div>
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold',color: '#0047AB',fontSize:12 }}>Loan Amount:</Typography>
            <p>{record.loan_amount}</p>
          </div>
          {/* Add more columns here with their respective titles and data */}
        </div>
      </Paper>
    );
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={() => {
          setLeadVisible(!leadVisible);
        }}
        style={{ marginBottom: 16, position: 'absolute', right: 30, backgroundColor: 'blueviolet' }}
        size="large"
      />
      <Input
        placeholder="Search with Phone number"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: 200, marginLeft: 30 }}
      />
      {loading ? (
        <Spin style={{ height: 100, width: 100, alignSelf: 'center' }} size="large" />
      ) : (
        <Table
          dataSource={filteredLeads}
          columns={columns}
          rowKey="id"
          expandable={{
            expandedRowRender: renderExpandedRow,
            onExpand: handleExpand,
            expandedRowKeys: expandedRowKeys,
          }}
        />
      )}

      <CreateLead
        visible={leadVisible}
        handleOk={handleOk}
        onCancel={() => setLeadVisible(false)}
        leads={leads}
      />

      <Modal
        title="Lead Details"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <LeadDetailsModal lead={selectedLead} />
      </Modal>

      <Modal
        title="Edit Lead"
        visible={editVisible}
        onCancel={() => setEditVisible(!editVisible)}
        footer={null}
      >
        <EditLead form={form} handleUpdate={handleUpdate} handleCancel={() => setEditVisible(!editVisible)} selectedLead={selectedLead} />
      </Modal>
    </>
  );
};

export default Leads;