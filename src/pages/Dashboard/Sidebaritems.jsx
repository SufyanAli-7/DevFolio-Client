import { 
    DashboardOutlined,
    FileOutlined, 
    IdcardOutlined, 
    InfoCircleOutlined, 
    ThunderboltOutlined, 
    ProjectOutlined, 
    ShareAltOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const items = [
    { 
        key: '/dashboard', 
        label: <Link to='/dashboard'>Dashboard</Link>, 
        icon: <DashboardOutlined /> 
    },
    {
        key: 'portfolio-submenu',
        label: 'Portfolio Manage',
        icon: <FileOutlined />,
        children: [
            { 
                key: '/dashboard/portfolio/personal-info', 
                label: <Link to='/dashboard/portfolio/personal-info'>Personal Info</Link>,
                icon: <IdcardOutlined /> 
            },
            { 
                key: '/dashboard/portfolio/about', 
                label: <Link to='/dashboard/portfolio/about'>About</Link>,
                icon: <InfoCircleOutlined /> 
            },
            { 
                key: '/dashboard/portfolio/skills', 
                label: <Link to='/dashboard/portfolio/skills'>Skills</Link>,
                icon: <ThunderboltOutlined /> 
            },
            { 
                key: '/dashboard/portfolio/projects', 
                label: <Link to='/dashboard/portfolio/projects'>Projects</Link>,
                icon: <ProjectOutlined /> 
            },
            { 
                key: '/dashboard/portfolio/social-links', 
                label: <Link to='/dashboard/portfolio/social-links'>Social Links</Link>,
                icon: <ShareAltOutlined /> 
            },
        ]
    }
];