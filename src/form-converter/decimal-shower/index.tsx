import { Input } from 'antd';
import classnames from 'classnames';
import React, { forwardRef } from 'react';
import { onInputChangeWrapper } from '../utils';
import './index.less';

interface DecimalShowerCommonProps {
  value: string;
  addonBefore: string;
}

type DecimalShowerProps = (
  | { inputMode: true; error: boolean; autoFocus?: boolean; onInputChange: (input: string) => void }
  | { inputMode: false }
) &
  DecimalShowerCommonProps;

const DecimalShower = forwardRef<Input, DecimalShowerProps>((props, ref) =>
  props.inputMode ? (
    <Input
      ref={ref}
      className={classnames('decimal-shower', { error: props.error })}
      value={props.value}
      addonBefore={props.addonBefore}
      onChange={onInputChangeWrapper(props.onInputChange)}
      autoFocus={props.autoFocus}
      allowClear
    />
  ) : (
    <Input
      className="decimal-shower"
      value={props.value}
      addonBefore={props.addonBefore}
      readOnly
      allowClear
    />
  )
);

export default DecimalShower;
