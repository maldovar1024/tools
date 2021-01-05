import { Tabs } from 'antd';
import React, { FC } from 'react';
import FormConverter from './form-converter';
import RadixConverter from './radix-converter';

const { TabPane } = Tabs;

const App: FC = () => (
  <Tabs
    className="App"
    defaultActiveKey="radix-converter"
    tabPosition="left"
    size="large"
  >
    <TabPane tab="进制转换" key="radix-converter">
      <RadixConverter />
    </TabPane>
    <TabPane tab="格式转换" key="form-converter">
      <FormConverter />
    </TabPane>
  </Tabs>
);

export default App;
