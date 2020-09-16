import { Input } from 'antd';
import React, { FC } from 'react';
import { onInputChangeWrapper } from '../utils';

interface DecimalInputProp {
  value: string;
  addonBefore: string;
  onInputChange: (input: string) => void;
}

const DecimalInput: FC<DecimalInputProp> = props => (
  <Input
    className="decimal-shower"
    value={props.value}
    addonBefore={props.addonBefore}
    onChange={onInputChangeWrapper(props.onInputChange)}
    allowClear
  />
);

export default DecimalInput;
