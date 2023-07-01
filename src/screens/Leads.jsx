import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Modal, Form, Input, message,Spin,Select  } from 'antd';
import { EyeOutlined, EditOutlined, PlusOutlined, DeleteFilled, SyncOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import CreateLead from '../components/CreateLead';
import LeadDetailsModal from '../components/LeadDetailsModal';
import EditLead from '../components/EditLead';
import { useSelector } from 'react-redux';
import { db } from './firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

const Leads = () => {
  const userDetails = useSelector((state) => state.AuthReducer.userDetails);
  const [editVisible, setEditVisible] = useState(false)
  const [visible, setVisible] = useState(false);
  const [leadVisible, setLeadVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState('');

  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [searchText, leads]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const userId = userDetails.uid;
      const leadsCollectionRef = collection(db, 'leads', userId, 'leads');
      const querySnapshot = await getDocs(leadsCollectionRef);
      const leadsData = querySnapshot.docs.map((doc) => doc.data());
      const userLeads = leadsData.filter((lead) => lead.userId === userId);
      setLeads(userLeads);
      setLoading(false);
    } catch (error) {
      console.error('Error getting leads: ', error);
    }
  };

  const filterLeads = () => {
    const filteredLeads = leads.filter((lead) =>
      lead.mobileNumber.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredLeads(filteredLeads);
  };

  const handleCancel = () => {
    setVisible(false);
    setLeadVisible(false);
    form.resetFields();
  };

  const generateUniqueId = () => {
    const prefix = 'LED';
    const randomId = Math.floor(10000000 + Math.random() * 90000000); // Generate a random 8-digit number
    const uniqueId = prefix + randomId.toString().substring(0, 8); // Append prefix and take the first 8 digits
    return uniqueId;
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const userId = userDetails.uid;
      const userCollectionsRef = collection(db, 'leads', userId, 'leads');
      const userCollectionsSnapshot = await getDocs(userCollectionsRef);

      const leadToUpdate = userCollectionsSnapshot.docs.find((docSnap) => {
        const userDocData = docSnap.data();
        return userDocData.mobileNumber === values.mobileNumber;
      });

      if (leadToUpdate) {
        const docRef = doc(db, 'leads', userId, 'leads', leadToUpdate.id);
        await updateDoc(docRef, values);
        fetchLeads();
        message.success('Lead updated successfully.');
        handleCancel();
      } else {
        message.error('Lead not found.');
      }
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
      case 'pending':
        return <ClockCircleOutlined />;
      case 'approved':
        return <CheckCircleOutlined />;
      case 'inprogress':
        return <SyncOutlined spin />;
      default:
        return '';
    }
  };

  const handleOk = async (form, values) => {
    form.validateFields().then(async (values) => {
      const userId = userDetails.uid;
      const leadId = generateUniqueId();

      const leadData = {
        leadId,
        userId,
        ...values,
        status: 'pending',
      };

      try {
        await addDoc(collection(db, 'leads', userId, 'leads'), leadData);
        setLeadVisible(!leadVisible);
        message.success('Lead created successfully.');
        fetchLeads();
        form.resetFields();
      } catch (error) {
        console.error('Error setting document: ', error);
      }
    });
  };

  const handleDelete = async (record) => {
    try {
      const userId = userDetails.uid;
      const userCollectionsRef = collection(db, 'leads', userId, 'leads');
      const userCollectionsSnapshot = await getDocs(userCollectionsRef);

      const leadToUpdate = userCollectionsSnapshot.docs.find((docSnap) => {
        const userDocData = docSnap.data();
        return userDocData.mobileNumber === record.mobileNumber;
      });

      if (leadToUpdate) {
        const docRef = doc(db, 'leads', userId, 'leads', leadToUpdate.id);
        await deleteDoc(docRef);
        fetchLeads();
        message.success('Lead deleted successfully.');
      } else {
        message.error('Lead not found.');
      }
    } catch (error) {
      console.error('Error deleting lead: ', error);
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
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag icon={getStatusIcon(status)} color={getStatusColor(status)}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>,
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

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={() => {
          setLeadVisible(!leadVisible);
        }}
        style={{ marginBottom: 16,position:'absolute',right:30 }}
         size="large"
      />
        {/* New Lead
      </Button> */}
      <Input
        placeholder="Search with Phone number"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: 200, marginLeft: 30 }}
      />
      {loading ? (
        <Spin style={{height:100,width:100,alignSelf:'center'}} size="large" />
      ) : (
        <Table dataSource={filteredLeads} columns={columns} rowKey="leadId" />
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
        onCancel={()=> setEditVisible(!editVisible)}
        footer={null}
      >
        <EditLead form={form} handleUpdate={handleUpdate} handleCancel={()=> setEditVisible(!editVisible)} selectedLead={selectedLead} />
      </Modal>
    </>
  );
};

export default Leads;
