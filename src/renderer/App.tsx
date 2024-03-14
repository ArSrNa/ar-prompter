import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import 'tdesign-react/dist/tdesign.min.css';
import './App.css';

import { Layout, Link, Menu, Space } from 'tdesign-react';
import {
  SearchIcon,
  NotificationFilledIcon,
  HomeIcon,
} from 'tdesign-icons-react';
import { useEffect } from 'react';
import Prompter from './pages/Prompter';
import Clapperboard from './pages/Clapperboard';
import { RecoilRoot } from 'recoil';
const { Header, Content, Footer } = Layout;
const { HeadMenu, MenuItem } = Menu;
function Main() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header>
        <HeadMenu
          style={{
            position: 'fixed',
            zIndex: 999999,
            backdropFilter: 'blur(20px) saturate(1.8)',
            background: 'rgba(36,36,36,0.5)',
          }}
          value="item1"
          logo={
            <div
              onClick={() => navigate('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <img
                width={35}
                height={35}
                src={require('./images/logo.png')}
                alt="logo"
              />
              <h2>Ar-Sr-Na</h2>
            </div>
          }
        >
          <Space size="large">
            <Link onClick={() => navigate('/clapperboard')}>场记板</Link>
            <Link onClick={() => navigate('/prompter')}>提词器</Link>
          </Space>
        </HeadMenu>
      </Header>
      <Content>
        <Routes>
          <Route path="/prompter" element={<Prompter />} />
          <Route path="/clapperboard" element={<Clapperboard />} />
        </Routes>
      </Content>
      <Footer>Powered by Ar-Sr-Na</Footer>
    </Layout>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute('theme-mode', 'dark');
  }, []);
  return (
    <Router>
      <RecoilRoot>
        <Main />
      </RecoilRoot>
    </Router>
  );
}
