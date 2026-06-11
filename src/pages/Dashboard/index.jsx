import { useState } from 'react';
import { Button, Layout, Menu, theme, ConfigProvider } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { items } from './Sidebaritems';
import { useAuth } from '@/context/AuthContext';
import Routes from './Routes';

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
    const { user, handleLogout } = useAuth();
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const getSelectedKey = () => {
        if (currentPath === '/dashboard/portfolio' || currentPath === '/dashboard/portfolio/') {
            return ['/dashboard/portfolio/personal-info'];
        }
        return [currentPath];
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#2563eb', // blue-600
                    colorBgContainer: '#18181b', // zinc-900
                    colorBgLayout: '#09090b', // zinc-950
                    borderRadius: 10,
                    colorBorder: '#27272a', // zinc-800
                    colorTextBase: '#f4f4f5', // zinc-100
                },
                components: {
                    Layout: {
                        siderBg: '#18181b',
                        headerBg: '#18181b',
                        bodyBg: '#09090b',
                    },
                    Menu: {
                        darkItemBg: '#18181b',
                        darkItemColor: '#a1a1aa', // zinc-400
                        darkItemSelectedBg: '#2563eb', // blue-600
                        darkItemSelectedColor: '#ffffff',
                    }
                }
            }}
        >
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    breakpoint='lg'
                    collapsible
                    collapsed={collapsed}
                    onCollapse={value => setCollapsed(value)}
                    style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'auto', alignSelf: 'flex-start', borderRight: '1px solid #27272a' }}
                >
                    <div className='py-3 flex justify-center items-center'>
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            {!collapsed && (
                                <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors duration-300 select-none">
                                    Dev<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Folio</span>
                                </span>
                            )}
                        </Link>
                    </div>
                    <Menu 
                        theme='dark' 
                        selectedKeys={getSelectedKey()} 
                        defaultOpenKeys={['portfolio-submenu']} 
                        mode="inline" 
                        items={items} 
                    />
                </Sider>
                <Layout>
                    <Header 
                        className='flex items-center justify-between px-6 border-b border-zinc-800/80' 
                        style={{ 
                            background: '#18181b',
                            height: '64px',
                            lineHeight: '64px'
                        }}
                    >
                        {/* User Profile Info & Logout */}
                        <div className="flex items-center justify-end space-x-6 w-full">
                            <div className="hidden sm:flex flex-col text-right">
                                <span className="text-zinc-200 text-sm font-semibold leading-none text-left">{user?.userName.charAt(0).toUpperCase() + user?.userName.slice(1) || 'Developer'}</span>
                                <span className="text-zinc-500 text-xs mt-1.5 leading-none">{user?.email}</span>
                            </div>
                            <Button 
                                type="primary" 
                                danger 
                                ghost
                                onClick={handleLogout}
                                className="border-red-500/30 hover:border-red-500 text-red-500 hover:text-white hover:bg-red-600 transition-all duration-200"
                            >
                                Logout
                            </Button>
                        </div>
                    </Header>
                    <Content className='p-6 bg-zinc-950'>
                        <Routes />
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default Dashboard;