import { Radio } from 'antd';
import React, { useState, FC } from 'react';
import { FloatShower } from './float-shower';
import Label from '../component/label';
import { convertFormOfNumber, FloatType } from './utils';

const RadioGroup = Radio.Group;

export const FormConverter: FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [inputMode, setInputMode] = useState<FloatType>('f32');
  const [resultMode, setResultMode] = useState<FloatType>('f32');

  const handleInputChange = (input: string) => {
    const result = convertFormOfNumber(input, inputMode, resultMode);
    if (result !== '') {
      setInput(input);
    }
    setResult(result);
  };

  const handleInputModeChange = (mode: FloatType) => {
    setInputMode(mode);
    setInput('');
    setResult('');
  };

  const handleResultModeChange = (mode: FloatType) => {
    setResultMode(mode);
    const result = convertFormOfNumber(input, inputMode, mode);
    setResult(result);
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
            <RadioGroup value={inputMode} onChange={e => handleInputModeChange(e.target.value)}>
              <Radio value="f32">32 位浮点数</Radio>
              <Radio value="f64">64 位浮点数</Radio>
            </RadioGroup>
          </div>
          <Label>输入数字</Label>
          <FloatShower
            inputMode={true}
            value={input}
            onInputChange={handleInputChange}
            floatType={inputMode}
          />
        </div>
        <div className="result">
          <div className="selection">
            <RadioGroup value={resultMode} onChange={e => handleResultModeChange(e.target.value)}>
              <Radio value="f32">32 位浮点数</Radio>
              <Radio value="f64">64 位浮点数</Radio>
            </RadioGroup>
          </div>
          <Label>转换结果</Label>
          <FloatShower inputMode={false} value={result} floatType={resultMode} />
        </div>
      </div>
    </div>
  );
};
