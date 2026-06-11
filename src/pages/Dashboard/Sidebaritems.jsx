import { UserOutlined, FileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const items = [

    { key: '1', label: <Link to='/dashboard'>Dashboard</Link>, icon: <UserOutlined /> },
    { key: '2', label: <Link to='/dashboard/portfolio'>Portfolio</Link>, icon: <FileOutlined /> }

]