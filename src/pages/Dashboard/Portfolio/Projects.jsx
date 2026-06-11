import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Upload, message, Card, Spin, Space, Alert, Popconfirm, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LoadingOutlined, GithubOutlined, GlobalOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const Projects = () => {
  const { backendUrl } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasPortfolio, setHasPortfolio] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const fetchProjects = () => {
    setLoading(true);
    axios.get(`${backendUrl}/api/portfolio/me`, { withCredentials: true })
      .then(res => {
        if (res.data.success && res.data.portfolio) {
          setProjects(res.data.portfolio.projects || []);
        }
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setHasPortfolio(false);
        } else {
          message.error("Failed to load projects list");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, [backendUrl]);

  const showAddModal = () => {
    setModalMode('add');
    setEditingProject(null);
    setFileList([]);
    form.resetFields();
    setIsModalOpen(true);
  };

  const showEditModal = (project) => {
    setModalMode('edit');
    setEditingProject(project);
    setFileList([]);
    form.setFieldsValue({
      title: project.title,
      description: project.description,
      codeLink: project.codeLink,
      liveLink: project.liveLink,
      tags: project.tags || [],
    });
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (values) => {
    setSaving(true);
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('codeLink', values.codeLink);
    formData.append('liveLink', values.liveLink);
    formData.append('tags', JSON.stringify(values.tags || []));

    if (fileList.length > 0) {
      formData.append('image', fileList[0].originFileObj);
    }

    try {
      if (modalMode === 'add') {
        const res = await axios.post(`${backendUrl}/api/portfolio/projects`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        });
        if (res.data.success) {
          message.success("Project added successfully!");
          setProjects(res.data.portfolio.projects);
          setIsModalOpen(false);
        }
      } else {
        const res = await axios.put(`${backendUrl}/api/portfolio/projects/${editingProject._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        });
        if (res.data.success) {
          message.success("Project updated successfully!");
          setProjects(res.data.portfolio.projects);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/portfolio/projects/${projectId}`, {
        withCredentials: true
      });
      if (res.data.success) {
        message.success("Project deleted successfully!");
        setProjects(res.data.portfolio.projects);
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to delete project");
    }
  };

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false; // Prevent auto-upload
    },
    fileList,
  };

  const columns = [
    {
      title: <span className="text-zinc-400 font-semibold text-sm">Cover</span>,
      key: 'image',
      width: '15%',
      render: (text, record) => (
        <div className="w-16 h-10 rounded overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center">
          {record.image ? (
            <img src={`${backendUrl}${record.image}`} alt={record.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] text-zinc-600">No Image</span>
          )}
        </div>
      ),
    },
    {
      title: <span className="text-zinc-400 font-semibold text-sm">Title</span>,
      dataIndex: 'title',
      key: 'title',
      width: '20%',
      render: (text) => <span className="text-white font-medium">{text}</span>,
    },
    {
      title: <span className="text-zinc-400 font-semibold text-sm">Description</span>,
      dataIndex: 'description',
      key: 'description',
      width: '30%',
      render: (text) => (
        <span className="text-zinc-400 text-xs block max-w-xs truncate" title={text}>
          {text}
        </span>
      ),
    },
    {
      title: <span className="text-zinc-400 font-semibold text-sm">Links</span>,
      key: 'links',
      width: '12%',
      render: (text, record) => (
        <Space size="middle">
          {record.codeLink && (
            <a href={record.codeLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              <GithubOutlined className="text-lg" />
            </a>
          )}
          {record.liveLink && (
            <a href={record.liveLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
              <GlobalOutlined className="text-lg" />
            </a>
          )}
        </Space>
      ),
    },
    {
      title: <span className="text-zinc-400 font-semibold text-sm">Tags</span>,
      dataIndex: 'tags',
      key: 'tags',
      width: '15%',
      render: (tags) => (
        <div className="flex flex-wrap gap-1 max-w-[150px]">
          {tags && tags.map((tag, i) => (
            <Tag key={i} className="bg-zinc-800 text-blue-300 border-zinc-750 text-[10px] px-1.5 py-0.5 rounded m-0">
              {tag}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: <span className="text-zinc-400 font-semibold text-sm">Actions</span>,
      key: 'actions',
      width: '8%',
      render: (text, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showEditModal(record)}
            className="text-blue-400 hover:text-blue-300 hover:bg-zinc-800"
          />
          <Popconfirm
            title="Delete Project"
            description={`Are you sure you want to delete "${record.title}"?`}
            onConfirm={() => handleDelete(record._id)}
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

  if (loading && projects.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#2563eb' }} spin />} />
      </div>
    );
  }

  if (!hasPortfolio) {
    return (
      <div className="max-w-4xl mx-auto py-4">
        <Alert
          message={<span className="font-semibold text-white">Portfolio Required</span>}
          description="Please setup your Personal Info tab first to initialize your developer portfolio before adding projects."
          type="warning"
          showIcon
          className="bg-zinc-900 border-yellow-500/20 text-zinc-300"
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-4">
      <Card 
        title={<span className="text-white text-xl font-bold">Manage Projects</span>}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={showAddModal}
            className="bg-blue-600 hover:bg-blue-500 border-none font-medium rounded-lg"
          >
            Add Project
          </Button>
        }
        className="bg-zinc-900 border-zinc-800/80 shadow-xl rounded-2xl"
      >
        <Table 
          columns={columns} 
          dataSource={projects.map(p => ({ ...p, key: p._id }))} 
          pagination={false}
          className="dark-antd-table bg-transparent"
          locale={{ emptyText: <span className="text-zinc-600">No projects added yet</span> }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={
          <span className="text-white text-lg font-bold">
            {modalMode === 'add' ? 'Add New Project' : 'Edit Project'}
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
          {/* Project Cover Preview & Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 p-4 bg-zinc-950/40 rounded-xl border border-zinc-850">
            <div className="w-24 h-16 rounded overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center relative shadow-inner">
              {fileList.length > 0 ? (
                <img src={URL.createObjectURL(fileList[0])} alt="Project Cover Preview" className="w-full h-full object-cover" />
              ) : editingProject?.image ? (
                <img src={`${backendUrl}${editingProject.image}`} alt="Project Cover Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-zinc-600 text-[10px] font-semibold text-center px-1">No Cover Selected</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Upload {...uploadProps} accept="image/*" maxCount={1} showUploadList={false}>
                <Button icon={<UploadOutlined />} className="border-zinc-700 hover:border-blue-500 text-zinc-300 hover:text-white bg-zinc-900">
                  Select Project Cover
                </Button>
              </Upload>
              <span className="text-zinc-500 text-xs">Supports PNG, JPG, or JPEG. Max size: 2MB.</span>
            </div>
          </div>

          <Form.Item
            name="title"
            label={<span className="text-zinc-300 font-medium">Project Title</span>}
            rules={[{ required: true, message: 'Please enter project title' }]}
          >
            <Input 
              placeholder="e.g. Genix AI Showcase" 
              className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 hover:border-zinc-700 focus:border-blue-500" 
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className="text-zinc-300 font-medium">Description</span>}
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder="Write a brief overview of the project, features, and tech stack..." 
              className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 hover:border-zinc-700 focus:border-blue-500" 
            />
          </Form.Item>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              name="codeLink"
              label={<span className="text-zinc-300 font-medium">Code Repository Link</span>}
              rules={[{ required: true, message: 'Please enter code link' }, { type: 'url', message: 'Please enter a valid URL' }]}
            >
              <Input 
                placeholder="e.g. https://github.com/user/project" 
                className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 hover:border-zinc-700 focus:border-blue-500" 
              />
            </Form.Item>

            <Form.Item
              name="liveLink"
              label={<span className="text-zinc-300 font-medium">Live Deployment Link</span>}
              rules={[{ required: true, message: 'Please enter live link' }, { type: 'url', message: 'Please enter a valid URL' }]}
            >
              <Input 
                placeholder="e.g. https://project.vercel.app" 
                className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 hover:border-zinc-700 focus:border-blue-500" 
              />
            </Form.Item>
          </div>

          <Form.Item
            name="tags"
            label={<span className="text-zinc-300 font-medium">Tags / Technologies Used</span>}
          >
            <Select 
              mode="tags" 
              style={{ width: '100%' }} 
              placeholder="Type a tag and press Enter (e.g. React, Node.js)" 
              tokenSeparators={[',']}
              dropdownStyle={{ background: '#18181b', border: '1px solid #27272a' }}
              className="dark-select bg-zinc-950 text-zinc-100"
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

export default Projects;