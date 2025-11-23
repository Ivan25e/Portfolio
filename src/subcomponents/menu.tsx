import 'react';
import { Menu as AntMenu, ConfigProvider}  from 'antd' ;
import { Link } from 'react-router-dom';
import { HomeOutlined, PlaySquareOutlined, GithubOutlined , LinkedinOutlined } from '@ant-design/icons';

const items = [
    {
        key: 'home',
        icon: <HomeOutlined />,
        label: <Link to="/">Home</Link>
    },
    {
        key: 'demos',
        icon: <PlaySquareOutlined />,
        label: <Link to="/demo">Live Demos</Link>
    },
    {
        key: 'github',
        icon: <GithubOutlined />,
        label: (
            <a 
                href="https://github.com/Ivan25e"
                target="_blank"
                rel="noopener noreferrer"
            >
                GitHub
            </a>
        )
    },
    {
        key: 'linkedin',
        icon: <LinkedinOutlined />,
        label: (
            <a 
                href="https://www.linkedin.com/in/ivan-chinchilla-cordoba/" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                Contact me on LinkedIn!
            </a>
        )
    }
];

export default function Menu() {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                    darkItemSelectedBg: '#2a2a2a',    // selected background
                    darkItemSelectedColor: '#ffffff', // selected text
                    darkItemHoverBg: '#3b3b3b',       // hover bg
                    }
                }
            }}
        >
            <AntMenu
                mode="horizontal"
                items={items}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 'none'
                }}
                theme="dark"
                defaultSelectedKeys={['home']}
            />
        </ConfigProvider>
    );
}