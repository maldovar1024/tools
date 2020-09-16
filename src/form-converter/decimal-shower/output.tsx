import { Input } from 'antd';
import React, { FC } from 'react';

interface DecimalOutputProp {
  value: string;
  addonBefore: string;
}

const DecimalOutput: FC<DecimalOutputProp> = props => (
  <Input
    className="decimal-shower"
    value={props.value}
    addonBefore={props.addonBefore}
    allowClear
  />
);

export default DecimalOutput;
