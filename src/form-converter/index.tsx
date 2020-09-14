import { Radio } from 'antd';
import React, { FC, useState } from 'react';
import Label from '../component/label';
import DecimalShower from './decimal-shower';
import FloatShower from './float-shower';
import { convertFormOfNumber, ModeOfNumber } from './utils';

const RadioGroup = Radio.Group;

export const FormConverter: FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [inputMode, setInputMode] = useState<ModeOfNumber>('d');
  const [resultMode, setResultMode] = useState<ModeOfNumber>('f32');

  const handleInputChange = (input: string) => {
    const result = convertFormOfNumber(input, inputMode, resultMode);
    if (result !== '') {
      setInput(input);
    }
    setResult(result);
  };

  const handleInputModeChange = (mode: ModeOfNumber) => {
    setInputMode(mode);
    setInput('');
    setResult('');
  };

  const handleResultModeChange = (mode: ModeOfNumber) => {
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
              <Radio value="d">十进制数</Radio>
              <Radio value="f32">32 位浮点数</Radio>
              <Radio value="f64">64 位浮点数</Radio>
            </RadioGroup>
          </div>
          <Label>输入数字</Label>
          {inputMode === 'd' ? (
            <DecimalShower inputMode={true} value={input} onInputChange={handleInputChange} />
          ) : (
            <FloatShower
              inputMode={true}
              value={input}
              onInputChange={handleInputChange}
              floatType={inputMode}
            />
          )}
        </div>
        <div className="result">
          <div className="selection">
            <RadioGroup value={resultMode} onChange={e => handleResultModeChange(e.target.value)}>
              <Radio value="d">十进制数</Radio>
              <Radio value="f32">32 位浮点数</Radio>
              <Radio value="f64">64 位浮点数</Radio>
            </RadioGroup>
          </div>
          <Label>转换结果</Label>
          {resultMode === 'd' ? (
            <DecimalShower inputMode={false} value={result} />
          ) : (
            <FloatShower inputMode={false} value={result} floatType={resultMode} />
          )}
        </div>
      </div>
    </div>
  );
};
