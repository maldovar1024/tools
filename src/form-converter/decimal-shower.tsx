import { Input } from 'antd';
import React, { FC } from 'react';
import { onInputChangeWrapper } from './utils';

interface DecimalShowerCommonProp {
  value: string;
}

type DecimalShowerProp = (
  | { inputMode: true; onInputChange: (input: string) => void }
  | { inputMode: false }
) &
  DecimalShowerCommonProp;

const DecimalShower: FC<DecimalShowerProp> = props => {
  return (
    <Input
      className="decimal-shower"
      value={props.value}
      readOnly={!props.inputMode}
      onChange={props.inputMode ? onInputChangeWrapper(props.onInputChange) : undefined}
      allowClear
    />
  );
};

export default DecimalShower;
