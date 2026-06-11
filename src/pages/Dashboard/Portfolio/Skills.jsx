import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Card, Spin, Space, Alert, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const Skills = () => {
  const { backendUrl } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasPortfolio, setHasPortfolio] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingSkill, setEditingSkill] = useState('');
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const fetchSkills = () => {
    setLoading(true);
    axios.get(`${backendUrl}/api/portfolio/me`, { withCredentials: true })
      .then(res => {
        if (res.data.success && res.data.portfolio) {
          setSkills(res.data.portfolio.skills || []);
        }
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setHasPortfolio(false);
        } else {
          message.error("Failed to load skills list");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSkills();
  }, [backendUrl]);

  const showAddModal = () => {
    setModalMode('add');
    setEditingSkill('');
    form.resetFields();
    setIsModalOpen(true);
  };

  const showEditModal = (skill) => {
    setModalMode('edit');
    setEditingSkill(skill);
    form.setFieldsValue({ skill });
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (values) => {
    setSaving(true);
    try {
      if (modalMode === 'add') {
        const res = await axios.post(`${backendUrl}/api/portfolio/skills`, { skill: values.skill }, {
          withCredentials: true
        });
        if (res.data.success) {
          message.success("Skill added successfully!");
          setSkills(res.data.portfolio.skills);
          setIsModalOpen(false);
        }
      } else {
        const res = await axios.put(`${backendUrl}/api/portfolio/skills/${editingSkill}`, { newSkill: values.skill }, {
          withCredentials: true
        });
        if (res.data.success) {
          message.success("Skill updated successfully!");
          setSkills(res.data.portfolio.skills);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to save skill");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (skill) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/portfolio/skills/${skill}`, {
        withCredentials: true
      });
      if (res.data.success) {
        message.success("Skill deleted successfully!");
        setSkills(res.data.portfolio.skills);
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to delete skill");
    }
  };

  const columns = [
    {
      title: <span className="text-zinc-400 font-semibold text-sm">#</span>,
      key: 'index',
      width: '10%',
      render: (text, record, index) => <span className="text-zinc-300">{index + 1}</span>,
    },
    {
      title: <span className="text-zinc-400 font-semibold text-sm">Skill Name</span>,
      dataIndex: 'skill',
      key: 'skill',
      width: '60%',
      render: (text) => <span className="text-white font-medium">{text}</span>,
    },
    {
      title: <span className="text-zinc-400 font-semibold text-sm">Actions</span>,
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showEditModal(record.skill)}
            className="text-blue-400 hover:text-blue-300 hover:bg-zinc-800"
          />
          <Popconfirm
            title="Delete Skill"
            description={`Are you sure you want to delete "${record.skill}"?`}
            onConfirm={() => handleDelete(record.skill)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ className: 'bg-red-600 hover:bg-red-500 border-none' }}
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              className="text-red-500 hover:text-red-400 hover:bg-red-950/20"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Map skills strings to table record structure
  const dataSource = skills.map((skill, index) => ({
    key: index,
    skill,
  }));

  if (loading && skills.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#2563eb' }} spin />} />
      </div>
    );
  }

  if (!hasPortfolio) {
    return (
      <div className="max-w-3xl mx-auto py-4">
        <Alert
          message={<span className="font-semibold text-white">Portfolio Required</span>}
          description="Please setup your Personal Info tab first to initialize your developer portfolio before adding skills."
          type="warning"
          showIcon
          className="bg-zinc-900 border-yellow-500/20 text-zinc-300"
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-4">
      <Card 
        title={<span className="text-white text-xl font-bold">Manage Skills</span>}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={showAddModal}
            className="bg-blue-600 hover:bg-blue-500 border-none font-medium rounded-lg"
          >
            Add Skill
          </Button>
        }
        className="bg-zinc-900 border-zinc-800/80 shadow-xl rounded-2xl"
      >
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          pagination={false}
          className="dark-antd-table bg-transparent"
          locale={{ emptyText: <span className="text-zinc-600">No skills added yet</span> }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={
          <span className="text-white text-lg font-bold">
            {modalMode === 'add' ? 'Add New Skill' : 'Edit Skill'}
          </span>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className="dark-antd-modal"
        styles={{
          mask: { backdropFilter: 'blur(4px)' },
          content: { background: '#18181b', border: '1px solid #27272a' }
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleModalSubmit}
          className="mt-4"
          requiredMark={false}
        >
          <Form.Item
            name="skill"
            label={<span className="text-zinc-300 font-medium">Skill Name</span>}
            rules={[{ required: true, message: 'Please enter skill name' }]}
          >
            <Input 
              placeholder="e.g. React" 
              className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 hover:border-zinc-700 focus:border-blue-500" 
              autoFocus
            />
          </Form.Item>

          <Form.Item className="mt-8 mb-0 text-right">
            <Space>
              <Button onClick={() => setIsModalOpen(false)} className="border-zinc-700 hover:border-zinc-600 text-zinc-400 hover:text-white bg-transparent">
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={saving}
                className="bg-blue-600 hover:bg-blue-500 border-none px-6 font-semibold"
              >
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Skills;