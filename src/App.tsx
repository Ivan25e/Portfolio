import 'antd/dist/reset.css'; 
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './subcomponents/home';
import Menu from './subcomponents/menu';
import Demo from './subcomponents/demo';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

function App() {
  return (
    <Layout style={{ background: 'transparent', minHeight: '100vh', minWidth:'100vh' }}>
      <Header style={{ background: 'transparent', padding: 0 }}>
        <Menu />
      </Header>

      <Content style={{ padding: '24px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo/*" element={<Demo />} />
        </Routes>
      </Content>
    </Layout>
  )
}

export default App
