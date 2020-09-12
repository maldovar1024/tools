import React from 'react';
import { Tabs } from 'antd';
import { RadixConverter } from './radix-converter';
import './app.less';
import { FormConverter } from './form-converter';

const { TabPane } = Tabs;

export default function App() {
  return (
    <div className="App">
      <Tabs tabPosition="left">
        <TabPane tab="进制转换" key="radix-converter">
          <RadixConverter />
        </TabPane>
        <TabPane tab="格式转换" key="form-converter">
          <FormConverter />
        </TabPane>
      </Tabs>
    </div>
  );
}
