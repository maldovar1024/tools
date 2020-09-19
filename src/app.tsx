import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import './app.less';
import { FormConverter } from './form-converter';
import Introduction from './introduction';
import { RadixConverter } from './radix-converter';

const { Sider, Content } = Layout;
const { Item } = Menu;

export default function App(): JSX.Element {
  const location = useLocation();
  return (
    <Layout className="App">
      <Sider>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <Item key="/">
            <Link to="/">简介</Link>
          </Item>
          <Item key="/radix-converter">
            <Link to="/radix-converter">进制转换</Link>
          </Item>
          <Item key="/form-converter">
            <Link to="/form-converter">格式转换</Link>
          </Item>
        </Menu>
      </Sider>
      <Content>
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route exact path="/radix-converter" component={RadixConverter} />
          <Route exact path="/form-converter" component={FormConverter} />
        </Switch>
      </Content>
    </Layout>
  );
}
