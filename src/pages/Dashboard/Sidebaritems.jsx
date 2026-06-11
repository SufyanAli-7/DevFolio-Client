import { UserOutlined, FileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const items = [
    { 
        key: '/dashboard', 
        label: <Link to='/dashboard'>Dashboard</Link>, 
        icon: <UserOutlined /> 
    },
    {
        key: 'portfolio-submenu',
        label: 'Portfolio Manage',
        icon: <FileOutlined />,
        children: [
            { key: '/dashboard/portfolio/personal-info', label: <Link to='/dashboard/portfolio/personal-info'>Personal Info</Link> },
            { key: '/dashboard/portfolio/about', label: <Link to='/dashboard/portfolio/about'>About</Link> },
            { key: '/dashboard/portfolio/skills', label: <Link to='/dashboard/portfolio/skills'>Skills</Link> },
            { key: '/dashboard/portfolio/projects', label: <Link to='/dashboard/portfolio/projects'>Projects</Link> },
            { key: '/dashboard/portfolio/social-links', label: <Link to='/dashboard/portfolio/social-links'>Social Links</Link> },
        ]
    }
];