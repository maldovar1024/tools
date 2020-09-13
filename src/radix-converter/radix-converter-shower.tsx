import React, { FC } from 'react';
import { Input, Radio, Select } from 'antd';
import { range } from './utils';

const RadioGroup = Radio.Group;
const Option = Select.Option;

interface RadixConverterShowerCommonProp {
  className?: string;
  radix: number;
  value: string;
  addonBefore: string;
  onRadixChange: (radix: number) => void;
}

type RadixConverterShowerProp = (
  | { inputMode: true; onInputChange: (input: string) => void }
  | { inputMode: false }
) &
  RadixConverterShowerCommonProp;

const partRadixes = [2, 8, 10, 16]; // 单选框可用的进制
const allRadixes = [...range(2, 37)]; // 全部进制

const RadixConverterShower: FC<RadixConverterShowerProp> = props => (
  <div className={props.className}>
    <div className="selection">
      <RadioGroup value={props.radix} onChange={e => props.onRadixChange(e.target.value)}>
        {partRadixes.map(radix => (
          <Radio key={radix} value={radix}>
            {radix} 进制
          </Radio>
        ))}
      </RadioGroup>
      <Select value={props.radix} onChange={props.onRadixChange} style={{ width: 90 }}>
        {allRadixes.map(radix => (
          <Option key={radix} value={radix}>
            {radix} 进制
          </Option>
        ))}
      </Select>
    </div>
    {props.inputMode ? (
      <Input
        value={props.value}
        addonBefore={props.addonBefore}
        allowClear
        onChange={e => props.onInputChange(e.target.value)}
      />
    ) : (
      <Input value={props.value} addonBefore={props.addonBefore} readOnly />
    )}
  </div>
);

export default RadixConverterShower;
