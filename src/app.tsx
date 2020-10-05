import { Layout } from 'antd';
import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './404';
import Fallback from './component/fallback';
import SideBar, { NavLinkConfig } from './component/sidebar';

const FormConverter = lazy(() => import('./form-converter'));
const Introduction = lazy(() => import('./introduction'));
const RadixConverter = lazy(() => import('./radix-converter'));

const { Content } = Layout;

const navlinkConfig: NavLinkConfig = [
  {
    to: '/',
    text: '简介',
  },
  {
    to: '/radix-converter',
    text: '进制转换',
  },
  {
    to: '/form-converter',
    text: '格式转换',
  },
];

const App: FC = () => {
  return (
    <Layout className="App">
      <SideBar theme="light" linkProps={navlinkConfig} />
      <Content>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path="/" component={Introduction} />
            <Route exact path="/radix-converter" component={RadixConverter} />
            <Route exact path="/form-converter" component={FormConverter} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default App;
