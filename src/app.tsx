import { Layout } from 'antd';
import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './404';
import SideBar, { NavLinkConfig } from './component/sidebar';
import FormConverter from './form-converter';
import Introduction from './introduction';
import RadixConverter from './radix-converter';

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
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route exact path="/radix-converter" component={RadixConverter} />
          <Route exact path="/form-converter" component={FormConverter} />
          <Route component={NotFound} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default App;
