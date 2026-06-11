import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Card, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const SocialLinks = () => {
  const [form] = Form.useForm();
  const { backendUrl } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasPortfolio, setHasPortfolio] = useState(true);

  useEffect(() => {
    axios.get(`${backendUrl}/api/portfolio/me`, { withCredentials: true })
      .then(res => {
        if (res.data.success && res.data.portfolio) {
          const { email, github, linkedin, whatsapp } = res.data.portfolio;
          form.setFieldsValue({ email, github, linkedin, whatsapp });
        }
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setHasPortfolio(false);
        } else {
          message.error("Failed to load social links");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [backendUrl, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      const res = await axios.put(`${backendUrl}/api/portfolio/social-links`, values, {
        withCredentials: true
      });
      if (res.data.success) {
        message.success("Social links updated successfully!");
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to update social links");
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
          description="Please setup your Personal Info tab first to initialize your developer portfolio before configuring your social links."
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
        title={<span className="text-white text-xl font-bold">Social & Contact Links</span>}
        className="bg-zinc-900 border-zinc-800/80 shadow-xl rounded-2xl"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label={<span className="text-zinc-300 font-medium">Contact Email</span>}
            rules={[
              { required: true, message: 'Please enter your contact email' },
              { type: 'email', message: 'Please enter a valid email address' }
            ]}
          >
            <Input 
              placeholder="e.g. email@example.com" 
              className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 hover:border-zinc-700 focus:border-blue-500" 
            />
          </Form.Item>

          <Form.Item
            name="github"
            label={<span className="text-zinc-300 font-medium">GitHub Profile URL</span>}
            rules={[
              { required: true, message: 'Please enter your GitHub profile link' },
              { type: 'url', message: 'Please enter a valid URL (starting with http:// or https://)' }
            ]}
          >
            <Input 
              placeholder="e.g. https://github.com/yourusername" 
              className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 hover:border-zinc-700 focus:border-blue-500" 
            />
          </Form.Item>

          <Form.Item
            name="linkedin"
            label={<span className="text-zinc-300 font-medium">LinkedIn Profile URL</span>}
            rules={[
              { required: true, message: 'Please enter your LinkedIn profile link' },
              { type: 'url', message: 'Please enter a valid URL (starting with http:// or https://)' }
            ]}
          >
            <Input 
              placeholder="e.g. https://linkedin.com/in/yourusername" 
              className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 hover:border-zinc-700 focus:border-blue-500" 
            />
          </Form.Item>

          <Form.Item
            name="whatsapp"
            label={<span className="text-zinc-300 font-medium">WhatsApp Link</span>}
            rules={[
              { required: true, message: 'Please enter your WhatsApp link' },
              { type: 'url', message: 'Please enter a valid URL (e.g. https://wa.me/number)' }
            ]}
          >
            <Input 
              placeholder="e.g. https://wa.me/1234567890" 
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

export default SocialLinks;