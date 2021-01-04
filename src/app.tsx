import { Tabs } from 'antd';
import React from 'react';
import { FormConverter } from './form-converter';
import { RadixConverter } from './radix-converter';

const { TabPane } = Tabs;

export default function App(): JSX.Element {
  return (
    <Tabs defaultActiveKey="radix-converter" tabPosition="left" size="large">
      <TabPane tab="进制转换" key="radix-converter">
        <RadixConverter />
      </TabPane>
      <TabPane tab="格式转换" key="form-converter">
        <FormConverter />
      </TabPane>
    </Tabs>
  );
}
