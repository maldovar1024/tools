import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import React, { FC, useState } from 'react';
import { DecimalInput, DecimalOutput } from './decimal-shower';
import { FloatInput, FloatOutput } from './float-shower';
import './index.less';
import { convertFormOfNumber, ModeOfNumber } from './utils';

const RadioGroup = Radio.Group;

type RadioChangeEventHandler = (e: RadioChangeEvent) => void;

export const FormConverter: FC = () => {
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState(false);
  const [result, setResult] = useState('');
  const [inputMode, setInputMode] = useState<ModeOfNumber>('d');
  const [resultMode, setResultMode] = useState<ModeOfNumber>('f32');

  const handleInputChange = (input: string) => {
    const result = convertFormOfNumber(input, inputMode, resultMode);
    console.log(result);
    setInputError(result === null);
    setInput(input);
    setResult(result ?? '');
  };

  const handleInputModeChange: RadioChangeEventHandler = e => {
    const mode = e.target.value as ModeOfNumber;
    setInputMode(mode);
    setInput('');
    setResult('');
  };

  const handleResultModeChange: RadioChangeEventHandler = e => {
    const mode = e.target.value as ModeOfNumber;
    setResultMode(mode);
    const result = convertFormOfNumber(input, inputMode, mode);
    setInputError(result === null);
    setResult(result ?? '');
  };

  return (
    <div className="form-converter">
      <div className="title">
        格式转换：
        <span className="subtitle">十进制数与 IEEE 754 32 位、64 位浮点数之间的转换</span>
      </div>
      <div className="content">
        <div className="input">
          <div className="selection">
            <RadioGroup value={inputMode} onChange={handleInputModeChange}>
              <Radio value="d">十进制数</Radio>
              <Radio value="f32">32 位浮点数</Radio>
              <Radio value="f64">64 位浮点数</Radio>
            </RadioGroup>
          </div>
          {inputMode === 'd' ? (
            <DecimalInput
              value={input}
              error={inputError}
              addonBefore="输入数字"
              onInputChange={handleInputChange}
            />
          ) : (
            <FloatInput
              value={input}
              addonBefore="输入数字"
              onInputChange={handleInputChange}
              floatType={inputMode}
            />
          )}
        </div>
        <div className="result">
          <div className="selection">
            <RadioGroup value={resultMode} onChange={handleResultModeChange}>
              <Radio value="d">十进制数</Radio>
              <Radio value="f32">32 位浮点数</Radio>
              <Radio value="f64">64 位浮点数</Radio>
            </RadioGroup>
          </div>
          {resultMode === 'd' ? (
            <DecimalOutput value={result} addonBefore="转换结果" />
          ) : (
            <FloatOutput value={result} addonBefore="转换结果" floatType={resultMode} />
          )}
        </div>
      </div>
    </div>
  );
};
