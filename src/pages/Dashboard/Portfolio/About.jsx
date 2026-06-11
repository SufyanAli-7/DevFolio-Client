import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Card, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const About = () => {
  const [form] = Form.useForm();
  const { backendUrl } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasPortfolio, setHasPortfolio] = useState(true);

  useEffect(() => {
    axios.get(`${backendUrl}/api/portfolio/me`, { withCredentials: true })
      .then(res => {
        if (res.data.success && res.data.portfolio) {
          form.setFieldsValue({ about: res.data.portfolio.about });
        }
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setHasPortfolio(false);
        } else {
          message.error("Failed to load about details");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [backendUrl, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      const res = await axios.put(`${backendUrl}/api/portfolio/about`, values, {
        withCredentials: true
      });
      if (res.data.success) {
        message.success("About section updated successfully!");
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to update about section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#2563eb' }} spin />} />
      </div>
    );
  }

  if (!hasPortfolio) {
    return (
      <div className="max-w-2xl mx-auto py-4">
        <Alert
          message={<span className="font-semibold text-white">Portfolio Required</span>}
          description="Please setup your Personal Info tab first to initialize your developer portfolio before writing the About description."
          type="warning"
          showIcon
          className="bg-zinc-900 border-yellow-500/20 text-zinc-300"
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      <Card 
        title={<span className="text-white text-xl font-bold">About Section</span>}
        className="bg-zinc-900 border-zinc-800/80 shadow-xl rounded-2xl"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="about"
            label={<span className="text-zinc-300 font-medium">Detailed About Me</span>}
            rules={[{ required: true, message: 'Please enter a detailed about description' }]}
          >
            <Input.TextArea 
              rows={10} 
              placeholder="Describe your career path, education, professional principles, and work style in detail..." 
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

export default About;
