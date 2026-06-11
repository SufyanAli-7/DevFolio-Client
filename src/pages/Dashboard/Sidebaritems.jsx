import { UserOutlined, FileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const items = [

    { key: '1', label: <Link to='/dashboard'>Dashboard</Link>, icon: <UserOutlined /> },
    {
        key: '2',
        label: <Link to='/dashboard/portfolio'>Portfolio</Link>,
        icon: <FileOutlined />,
        children: [
            { key: '2-1', label: <Link to='/dashboard/portfolio/personal-info'>Personal Info</Link> },
            { key: '2-2', label: <Link to='/dashboard/portfolio/about'>About</Link> },
            { key: '2-3', label: <Link to='/dashboard/portfolio/skills'>Skills</Link> },
            { key: '2-4', label: <Link to='/dashboard/portfolio/projects'>Projects</Link> },
            { key: '2-5', label: <Link to='/dashboard/portfolio/social-links'>Social Links</Link> },
        ]
    }


] 