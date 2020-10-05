import { Spin } from 'antd';
import React, { FC, CSSProperties } from 'react';

const style: CSSProperties = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Fallback: FC = () => (
  <div style={style}>
    <Spin size="large" />
  </div>
);

export default Fallback;
