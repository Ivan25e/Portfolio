import 'react';
import { ConfigProvider, Layout, Menu } from 'antd';
import { Link, Routes, Route } from 'react-router-dom';
import { PlayCircleOutlined  } from '@ant-design/icons';
import SnakeDemo from './demos/snake';
import BubblePopDemo from './demos/bubble';
import ShooterDemo from './demos/shooting';

const { Sider, Content } = Layout;

export default function Demo() {
    return (
        <Layout style={{ minHeight: '80vh', background:'transparent' }}>
            
            <Sider
                width={220}
                style={{
                    background: 'transparent',
                    paddingTop: '20px'
                }}
            >
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                darkItemSelectedBg: '#2a2a2a',
                                darkItemSelectedColor: '#ffffff',
                                darkItemHoverBg: '#3b3b3b',
                            }
                        }
                    }}
                >

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['snake']}
                    style={{ background: 'transparent' }}
                    items={[
                        {
                            key: 'snake',
                            icon: <PlayCircleOutlined  />,
                            label: <Link to="/demo/snake">Snake</Link>,
                        },
                        {
                            key: 'bubblepop',
                            icon: <PlayCircleOutlined  />,
                            label: <Link to="/demo/bubblepop">Bubble Pop</Link>,
                        },
                        {
                            key: 'shooter',
                            icon: <PlayCircleOutlined  />,
                            label: <Link to="/demo/shooter">Shooter</Link>,
                        },
                    ]}
                />

                </ConfigProvider>
            </Sider>

            <Layout style={{ background: 'transparent' }}>
                <Content style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/snake" element={<SnakeDemo />} />
                        <Route path="/bubblepop" element={<BubblePopDemo />} />
                        <Route path="/shooter" element={<ShooterDemo />} />
                    </Routes>
                </Content>
            </Layout>

        </Layout>
    );
}