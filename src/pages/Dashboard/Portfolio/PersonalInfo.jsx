import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Card, Spin } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const PersonalInfo = () => {
  const [form] = Form.useForm();
  const { backendUrl } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    // Fetch existing portfolio data
    axios.get(`${backendUrl}/api/portfolio/me`, { withCredentials: true })
      .then(res => {
        if (res.data.success && res.data.portfolio) {
          const { name, role, bio, image } = res.data.portfolio;
          form.setFieldsValue({ name, role, bio });
          if (image) {
            setPreviewImage(`${backendUrl}${image}`);
          }
        }
      })
      .catch(err => {
        // If 404, the user doesn't have a portfolio yet, which is fine
        if (err.response?.status !== 404) {
          message.error("Failed to load personal info");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [backendUrl, form]);

  const onFinish = async (values) => {
    setSaving(true);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('role', values.role);
    formData.append('bio', values.bio);
    
    if (fileList.length > 0) {
      formData.append('image', fileList[0].originFileObj);
    }

    try {
      const res = await axios.put(`${backendUrl}/api/portfolio/personal-info`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      if (res.data.success) {
        message.success("Personal information updated successfully!");
        if (res.data.portfolio?.image) {
          setPreviewImage(`${backendUrl}${res.data.portfolio.image}`);
          setFileList([]);
        }
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to update personal information");
    } finally {
      setSaving(false);
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
      return false; // Prevent automatic upload
    },
    fileList,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#2563eb' }} spin />} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      <Card 
        title={<span className="text-white text-xl font-bold">Personal Information</span>}
        className="bg-zinc-900 border-zinc-800/80 shadow-xl rounded-2xl"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          {/* Avatar Preview & Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-4 bg-zinc-950/40 rounded-xl border border-zinc-850">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center relative shadow-inner">
              {previewImage ? (
                <img src={previewImage} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-zinc-600 text-xs font-semibold">No Image</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Upload {...uploadProps} accept="image/*" maxCount={1}>
                <Button icon={<UploadOutlined />} className="border-zinc-700 hover:border-blue-500 text-zinc-300 hover:text-white bg-zinc-900">
                  Select Profile Image
                </Button>
              </Upload>
              <span className="text-zinc-500 text-xs">Supports PNG, JPG, or JPEG. Max size: 2MB.</span>
            </div>
          </div>

          <Form.Item
            name="name"
            label={<span className="text-zinc-300 font-medium">Display Name</span>}
            rules={[{ required: true, message: 'Please enter your display name' }]}
          >
            <Input 
              placeholder="e.g. Sarah Jenkins" 
              className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 hover:border-zinc-700 focus:border-blue-500" 
            />
          </Form.Item>

          <Form.Item
            name="role"
            label={<span className="text-zinc-300 font-medium">Professional Role</span>}
            rules={[{ required: true, message: 'Please enter your role' }]}
          >
            <Input 
              placeholder="e.g. Frontend Architect" 
              className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 hover:border-zinc-700 focus:border-blue-500" 
            />
          </Form.Item>

          <Form.Item
            name="bio"
            label={<span className="text-zinc-300 font-medium">Brief Bio</span>}
            rules={[{ required: true, message: 'Please enter a short bio description' }]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Tell visitors about your specialties and background..." 
              className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 hover:border-zinc-700 focus:border-blue-500" 
            />
          </Form.Item>

          <Form.Item className="mt-8 mb-0">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={saving}
              className="w-full sm:w-auto px-8 py-2.5 rounded-lg font-semibold bg-blue-600 hover:bg-blue-500 border-none shadow-lg shadow-blue-900/10"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PersonalInfo;