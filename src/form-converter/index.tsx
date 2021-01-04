import { Radio } from 'antd';
import React, { FC, useCallback, useState } from 'react';
import { useConverterState } from '../hook';
import DecimalShower from './decimal-shower';
import { FloatInput, FloatOutput } from './float-shower';
import './index.less';
import { convertFormOfNumber, ModeOfNumber } from './utils';

const RadioGroup = Radio.Group;

const FormConverter: FC = () => {
  const [inputError, setInputError] = useState(false);
  const numberFormConverterWrapper = useCallback(
    (input: string, inputMode: ModeOfNumber, resultMode: ModeOfNumber) => {
      const result = convertFormOfNumber(input, inputMode, resultMode);
      setInputError(result === null);
      return result ?? '';
    },
    []
  );
  const {
    inputRef,
    input,
    result,
    inputMode,
    resultMode,
    handleInputChange,
    handleInputModeChange,
    handleResultModeChange,
  } = useConverterState<ModeOfNumber, ModeOfNumber>(
    'd',
    'f32',
    numberFormConverterWrapper
  );

  return (
    <div className="form-converter">
      <div className="title">
        格式转换：
        <span className="subtitle">
          十进制数与 IEEE 754 32 位、64 位浮点数之间的转换
        </span>
      </div>
      <div className="content">
        <div className="input">
          <div className="selection">
            <RadioGroup
              value={inputMode}
              onChange={e => handleInputModeChange(e.target.value)}
            >
              <Radio value="d">十进制数</Radio>
              <Radio value="f32">32 位浮点数</Radio>
              <Radio value="f64">64 位浮点数</Radio>
            </RadioGroup>
          </div>
          {inputMode === 'd' ? (
            <DecimalShower
              ref={inputRef}
              inputMode={true}
              value={input}
              error={inputError}
              addonBefore="输入数字"
              autoFocus
              onInputChange={handleInputChange}
            />
          ) : (
            <FloatInput
              ref={inputRef}
              value={input}
              addonBefore="输入数字"
              autoFocus={true}
              onInputChange={handleInputChange}
              floatType={inputMode}
            />
          )}
        </div>
        <div className="result">
          <div className="selection">
            <RadioGroup
              value={resultMode}
              onChange={e => handleResultModeChange(e.target.value)}
            >
              <Radio value="d">十进制数</Radio>
              <Radio value="f32">32 位浮点数</Radio>
              <Radio value="f64">64 位浮点数</Radio>
            </RadioGroup>
          </div>
          {resultMode === 'd' ? (
            <DecimalShower
              inputMode={false}
              value={result}
              addonBefore="转换结果"
            />
          ) : (
            <FloatOutput
              value={result}
              addonBefore="转换结果"
              floatType={resultMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormConverter;
