import React from 'react';
import { Tabs } from 'antd';
import { RadixConverter } from './radix-converter';
import './app.less';

const { TabPane } = Tabs;

export default function App() {
  return (
    <div className="App">
      <Tabs tabPosition="left">
        <TabPane tab="进制转换" key="radix-converter">
          <RadixConverter />
        </TabPane>
      </Tabs>
    </div>
  );
}
