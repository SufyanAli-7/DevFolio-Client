import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Progress, Table, Button, Tag, Space, Alert, Spin, message, Tooltip } from 'antd';
import { 
  ProjectOutlined, 
  ThunderboltOutlined, 
  CopyOutlined, 
  EyeOutlined, 
  PlusOutlined, 
  EditOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  LoadingOutlined,
  ArrowRightOutlined,
  GlobalOutlined,
  GithubOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const Hero = () => {
  const navigate = useNavigate();
  const { backendUrl, user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasPortfolio, setHasPortfolio] = useState(true);

  const fetchPortfolio = () => {
    setLoading(true);
    axios.get(`${backendUrl}/api/portfolio/me`, { withCredentials: true })
      .then(res => {
        if (res.data.success && res.data.portfolio) {
          setPortfolio(res.data.portfolio);
          setHasPortfolio(true);
        }
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setHasPortfolio(false);
          setPortfolio(null);
        } else {
          message.error("Failed to load dashboard statistics");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPortfolio();
  }, [backendUrl]);

  // Calculate completion score and missing fields list
  const calculateCompletion = (data) => {
    if (!data) return { percent: 0, missing: ['Personal Info', 'About Section', 'Skills', 'Projects', 'Social Links'] };
    
    let score = 0;
    const missing = [];
    
    // Profile Image (15%)
    if (data.image && data.image !== "https://res.cloudinary.com/demo/image/upload/d_avatar.png/avatar.png" && !data.image.includes("default-avatar.png")) {
      score += 15;
    } else {
      missing.push("Profile Image");
    }
    
    // Bio (10%)
    if (data.bio && data.bio.trim() !== "") {
      score += 10;
    } else {
      missing.push("Bio Description");
    }
    
    // About (15%)
    if (data.about && data.about.trim() !== "" && data.about !== "Welcome to my profile!") {
      score += 15;
    } else {
      missing.push("About Me Section");
    }
    
    // Skills (15%)
    if (data.skills && data.skills.length > 0) {
      score += 15;
    } else {
      missing.push("Add at least 1 Skill");
    }
    
    // Projects (20%)
    if (data.projects && data.projects.length > 0) {
      score += 20;
    } else {
      missing.push("Add at least 1 Project");
    }
    
    // GitHub (10%)
    if (data.github && data.github.trim() !== "" && data.github !== "https://github.com") {
      score += 10;
    } else {
      missing.push("GitHub URL");
    }
    
    // LinkedIn (10%)
    if (data.linkedin && data.linkedin.trim() !== "" && data.linkedin !== "https://linkedin.com") {
      score += 10;
    } else {
      missing.push("LinkedIn URL");
    }
    
    // WhatsApp (5%)
    if (data.whatsapp && data.whatsapp.trim() !== "" && data.whatsapp !== "https://wa.me/0" && data.whatsapp !== "https://wa.me/") {
      score += 5;
    } else {
      missing.push("WhatsApp Link");
    }
    
    return { percent: score, missing };
  };

  const { percent, missing } = calculateCompletion(portfolio);
  const publicUrl = `${window.location.origin}/portfolio/${user?.userName}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    message.success("Public Portfolio link copied to clipboard!");
  };

  const viewPortfolio = () => {
    window.open(`/portfolio/${user?.userName}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#2563eb' }} spin />} />
      </div>
    );
  }

  // Columns for recent projects
  const projectColumns = [
    {
      title: <span className="text-zinc-400 font-semibold text-xs">Project Cover</span>,
      key: 'image',
      width: '20%',
      render: (text, record) => (
        <div className="w-12 h-8 rounded overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center">
          {record.image ? (
            <img 
              src={record.image.startsWith('http') ? record.image : `${backendUrl}${record.image}`} 
              alt={record.title} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <span className="text-[8px] text-zinc-600">No Cover</span>
          )}
        </div>
      )
    },
    {
      title: <span className="text-zinc-400 font-semibold text-xs">Title</span>,
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span className="text-white font-medium text-sm">{text}</span>
    },
    {
      title: <span className="text-zinc-400 font-semibold text-xs">Live Links</span>,
      key: 'links',
      render: (text, record) => (
        <Space size="small">
          {record.codeLink && (
            <a href={record.codeLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xl">
              <GithubOutlined/>
            </a>
          )}
          {record.liveLink && (
            <a href={record.liveLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 text-xl">
              <GlobalOutlined/>
            </a>
          )}
        </Space>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Welcome Banner */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Dashboard Overview</h1>
          <p className="text-zinc-400 mt-1">Manage, update, and track your developer portfolio details.</p>
        </div>
        {hasPortfolio && (
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            onClick={viewPortfolio}
            className="bg-blue-600 hover:bg-blue-500 border-none font-semibold px-6 py-2.5 rounded-lg h-auto flex items-center gap-2"
          >
            View Live Portfolio
          </Button>
        )}
      </div>

      {!hasPortfolio && (
        <div className="mb-8">
          <Alert
            message={<span className="font-bold text-white text-lg">Setup Your Portfolio</span>}
            description={
              <div className="text-zinc-300 mt-1">
                You haven't initialized your developer portfolio yet. Create your personal info to unlock all dashboard sections and go live!
                <div className="mt-4">
                  <Button 
                    type="primary" 
                    icon={<ArrowRightOutlined />} 
                    onClick={() => navigate('/dashboard/portfolio/personal-info')}
                    className="bg-blue-600 hover:bg-blue-500 border-none font-semibold"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            }
            type="warning"
            showIcon
            className="bg-zinc-900 border-yellow-500/25 p-6 rounded-2xl"
          />
        </div>
      )}

      {/* Top Cards Row */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-zinc-900 border-zinc-800/80 rounded-2xl shadow-lg h-full min-h-29 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block">Total Skills</span>
                <span className="text-white text-3xl font-extrabold mt-1 block">{portfolio?.skills?.length || 0}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-900/20 border border-blue-500/20 flex items-center justify-center text-blue-400 text-lg">
                <ThunderboltOutlined />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-zinc-900 border-zinc-800/80 rounded-2xl shadow-lg h-full min-h-29 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block">Total Projects</span>
                <span className="text-white text-3xl font-extrabold mt-1 block">{portfolio?.projects?.length || 0}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-900/20 border border-purple-500/20 flex items-center justify-center text-purple-400 text-lg">
                <ProjectOutlined />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-zinc-900 border-zinc-800/80 rounded-2xl shadow-lg h-full min-h-29 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block">Portfolio Status</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded mt-2 inline-block ${hasPortfolio ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-yellow-950/80 text-yellow-500 border border-yellow-900'}`}>
                  {hasPortfolio ? 'Active & Live' : 'Not Configured'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-900/20 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
                <GlobalOutlined />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-zinc-900 border-zinc-800/80 rounded-2xl shadow-lg h-full min-h-29 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block">Completion Score</span>
                <span className="text-white text-3xl font-extrabold mt-1 block">{percent}%</span>
              </div>
              <Progress 
                type="circle" 
                percent={percent} 
                width={44} 
                strokeColor="#2563eb" 
                trailColor="#27272a" 
                showInfo={false}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Content Sections */}
      <Row gutter={[16, 16]}>
        {/* Left Column */}
        <Col xs={24} lg={16}>
          <Space direction="vertical" size={16} className="w-full">
            {/* Recent Projects Table */}
            <Card 
              title={<span className="text-white font-bold text-lg">Recent Projects</span>}
              extra={
                <Button 
                  type="link" 
                  onClick={() => navigate('/dashboard/portfolio/projects')}
                  className="text-blue-400 hover:text-blue-300 font-semibold p-0 flex items-center gap-1"
                >
                  Manage <ArrowRightOutlined className="text-xs" />
                </Button>
              }
              className="bg-zinc-900 border-zinc-800/80 rounded-2xl shadow-lg"
            >
              <Table
                columns={projectColumns}
                dataSource={portfolio?.projects?.slice(-3).map(p => ({ ...p, key: p._id })) || []}
                pagination={false}
                className="dark-antd-table bg-transparent"
                locale={{ emptyText: <span className="text-zinc-600 text-sm">No projects added yet</span> }}
              />
            </Card>

            {/* Skills Overview */}
            <Card
              title={<span className="text-white font-bold text-lg">Skills Showcase</span>}
              extra={
                <Button 
                  type="link" 
                  onClick={() => navigate('/dashboard/portfolio/skills')}
                  className="text-blue-400 hover:text-blue-300 font-semibold p-0 flex items-center gap-1"
                >
                  Manage <ArrowRightOutlined className="text-xs" />
                </Button>
              }
              className="bg-zinc-900 border-zinc-800/80 rounded-2xl shadow-lg"
            >
              {portfolio?.skills && portfolio.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {portfolio.skills.map((skill, index) => (
                    <Tag 
                      key={index} 
                      className="bg-zinc-950 text-blue-300 border-zinc-800 px-3 py-1 text-sm font-semibold rounded-lg m-0"
                    >
                      {skill}
                    </Tag>
                  ))}
                </div>
              ) : (
                <span className="text-zinc-600 text-sm block">No skills added yet</span>
              )}
            </Card>
          </Space>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={8}>
          <Space direction="vertical" size={16} className="w-full">
            {/* Public Portfolio URL Card */}
            {hasPortfolio && (
              <Card className="bg-zinc-900 border-zinc-800/80 rounded-2xl shadow-lg">
                <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-3">Your Portfolio Link</span>
                <div className="flex items-center gap-2 p-3 bg-zinc-950 rounded-xl border border-zinc-800 mb-4 overflow-hidden">
                  <span className="text-zinc-300 font-mono text-xs truncate grow">{publicUrl}</span>
                  <Tooltip title="Copy Link">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={copyToClipboard}
                      className="text-zinc-400 hover:text-white hover:bg-zinc-850"
                    />
                  </Tooltip>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={viewPortfolio} 
                    icon={<EyeOutlined />}
                    className="border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white bg-zinc-900 rounded-lg"
                  >
                    View Live
                  </Button>
                  <Button 
                    onClick={copyToClipboard} 
                    icon={<CopyOutlined />}
                    className="border-blue-700 hover:border-blue-500 text-blue-400 hover:text-blue-300 bg-blue-950/20 rounded-lg"
                  >
                    Copy URL
                  </Button>
                </div>
              </Card>
            )}

            {/* Portfolio Completion Progress */}
            <Card className="bg-zinc-900 border-zinc-800/80 rounded-2xl shadow-lg">
              <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-2">Portfolio Completion</span>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white text-xl font-bold">{percent}% Completed</span>
              </div>
              <Progress 
                percent={percent} 
                strokeColor="#2563eb" 
                trailColor="#27272a" 
                showInfo={false}
                className="mb-5"
              />
              
              {missing.length > 0 ? (
                <div>
                  <span className="text-zinc-500 text-xs font-bold block mb-3 uppercase tracking-wide">Missing Sections ({missing.length})</span>
                  <div className="space-y-2.5">
                    {missing.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-zinc-400 text-xs font-semibold bg-zinc-950/40 border border-zinc-900 px-3 py-2 rounded-lg">
                        <WarningOutlined className="text-yellow-500 text-sm" />
                        <span>Add your {item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/20 border border-emerald-900/35 p-3 rounded-xl">
                  <CheckCircleOutlined className="text-emerald-400 text-sm" />
                  <span>Your portfolio is 100% complete! Impressive job!</span>
                </div>
              )}
            </Card>

            {/* Quick Actions Card */}
            <Card 
              title={<span className="text-white font-bold text-md">Quick Actions</span>} 
              className="bg-zinc-900 border-zinc-800/80 rounded-2xl shadow-lg"
            >
              <div className="grid grid-cols-1 gap-2.5">
                <Button 
                  icon={<PlusOutlined />} 
                  onClick={() => navigate('/dashboard/portfolio/skills')}
                  disabled={!hasPortfolio}
                  className="w-full text-left justify-start h-10 border-zinc-700 text-zinc-300 hover:text-white bg-zinc-900 hover:border-zinc-500 rounded-lg flex items-center"
                >
                  Add New Skill
                </Button>
                <Button 
                  icon={<PlusOutlined />} 
                  onClick={() => navigate('/dashboard/portfolio/projects')}
                  disabled={!hasPortfolio}
                  className="w-full text-left justify-start h-10 border-zinc-700 text-zinc-300 hover:text-white bg-zinc-900 hover:border-zinc-500 rounded-lg flex items-center"
                >
                  Add New Project
                </Button>
                <Button 
                  icon={<EditOutlined />} 
                  onClick={() => navigate('/dashboard/portfolio/personal-info')}
                  className="w-full text-left justify-start h-10 border-zinc-700 text-zinc-300 hover:text-white bg-zinc-900 hover:border-zinc-500 rounded-lg flex items-center"
                >
                  Edit Portfolio Info
                </Button>
              </div>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Hero;