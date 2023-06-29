import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Button, Form, Input, message } from 'antd';
import { EyeOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import CreateLead from '../components/CreateLead';
import { useSelector } from 'react-redux';
import { db } from './firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

const Leads = () => {
  const userDetails = useSelector((state) => state.AuthReducer.userDetails);

  const [visible, setVisible] = useState(false);
  const [leadVisible, setLeadVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const userId = userDetails.uid;
      const leadsCollectionRef = collection(db, 'leads');
      const querySnapshot = await getDocs(leadsCollectionRef);
      const leadsData = querySnapshot.docs.map((doc) => doc.data());
      const userLeads = leadsData.filter((lead) => lead.userId === userId);
      setLeads(userLeads);
    } catch (error) {
      console.error('Error getting leads: ', error);
    }
  };

  const columns = [
    {
      title: 'Lead ID',
      dataIndex: 'leadId',
      key: 'leadId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      render: (status) => {
        let color = '';

        switch (status) {
          case 'Pending':
            color = 'orange';
            break;
          case 'Approved':
            color = 'green';
            break;
          case 'In Progress':
            color = 'blue';
            break;
          default:
            break;
        }

        return (
          <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
        );
      },
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
          >
            View
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedLead(record);
              setEditVisible(true);
              form.setFieldsValue(record);
            }}
          >
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleCancel = () => {
    setVisible(false);
    setEditVisible(false);
    form.resetFields();
  };

  function generateUniqueId() {
    const prefix = 'LED';
    const randomId = Math.floor(10000000 + Math.random() * 90000000); // Generate a random 8-digit number
    const uniqueId = prefix + randomId.toString().substring(0, 8); // Append prefix and take the first 8 digits

    return uniqueId;
  }
  
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
     

      const userId = userDetails.uid;
      const leadsCollectionRef = collection(db, 'leads');
      const querySnapshot = await getDocs(leadsCollectionRef);
      const leadDoc = querySnapshot.docs.find((doc) => doc.data().userId === userId);

      if (leadDoc) {
        const docRef = doc(db, 'leads', leadDoc.id);
        await updateDoc(docRef, values); // Update the 'leads' field with the updated leads data
        fetchLeads();
        handleCancel();
        message.success('Lead updated successfully.');
      } else {
        console.error('User lead document not found.');
      }
    } catch (error) {
      console.error('Error updating lead: ', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'Approved':
        return 'green';
      case 'In Progress':
        return 'blue';
      default:
        return '';
    }
  };

  const handleOk = (form) => {
    form.validateFields().then(async (values) => {
      values = { ...values, leadId: leads.length + 1, status: 'Pending' };
      const userId = userDetails.uid;

      const leadData = {
        leadId: leads.length + 1,
        userId,
        ...values,
        status: 'pending',
      };

      try {
        const docRef = doc(db, 'leads', userId); // Create a reference to the document with the user UID
        await setDoc(docRef, leadData); // Set the lead data with the specified document ID
        setLeads([...leads, leadData]);
        setLeadVisible(!leadVisible);
        message.success('Lead created successfully.');
        form.resetFields();
      } catch (error) {
        console.error('Error setting document: ', error);
      }
    });
  };

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      const newLead = {
        ...values,
        leadId: generateUniqueId(),
      };
      setLeads([...leads, newLead]);
      handleCancel();
      message.success('Lead created successfully.');
    });
  };

  const handleDelete = async (record) => {
    try {
      const userId = userDetails.uid;
      const docRef = doc(db, 'leads', userId);
      await deleteDoc(docRef);
      const filteredLeads = leads.filter((lead) => lead.leadId !== record.leadId);
      setLeads(filteredLeads);
      message.success('Lead deleted successfully.');
    } catch (error) {
      console.error('Error deleting lead: ', error);
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setLeadVisible(!leadVisible);
        }}
        style={{ marginBottom: 16 }}
      >
        New Lead
      </Button>
      <Table dataSource={leads} columns={columns} />
      <CreateLead
        visible={leadVisible}
        handleOk={handleOk}
        onCancel={() => setLeadVisible(!leadVisible)}
      />
      <Modal
        title="Lead Details"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {selectedLead && (
          <div>
            <p>Lead ID: {selectedLead.leadId}</p>
            <p>Name: {selectedLead.name}</p>
            <p>Address: {selectedLead.address}</p>
            <p>Profession: {selectedLead.profession}</p>
            <p>Salary: {selectedLead.salary}</p>
            <p>Loan Amount: {selectedLead.loanAmount}</p>
            <p>
              Status:{' '}
              <Tag color={getStatusColor(selectedLead.status)}>
                {selectedLead.status}
              </Tag>
            </p>
          </div>
        )}
      </Modal>

      <Modal
        title={selectedLead ? 'Edit Lead' : 'New Lead'}
        visible={editVisible}
        onCancel={handleCancel}
        onOk={selectedLead ? handleUpdate : handleFormSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter the address.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="profession"
            label="Profession"
            rules={[{ required: true, message: 'Please enter the profession.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="salary"
            label="Salary"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="loanAmount"
            label="Loan Amount"
          >
            <Input type="number" />
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
    </>
  );
};

export default Leads;
