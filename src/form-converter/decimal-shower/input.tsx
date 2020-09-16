import { Input } from 'antd';
import React, { FC } from 'react';
import classnames from 'classnames';
import { onInputChangeWrapper } from '../utils';

interface DecimalInputProp {
  value: string;
  error: boolean;
  addonBefore: string;
  onInputChange: (input: string) => void;
}

const DecimalInput: FC<DecimalInputProp> = ({ value, error, addonBefore, onInputChange }) => (
  <Input
    className={classnames('decimal-shower', { error })}
    value={value}
    addonBefore={addonBefore}
    onChange={onInputChangeWrapper(onInputChange)}
    allowClear
  />
);

export default DecimalInput;
