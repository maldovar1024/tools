import React, { useState, FC, useRef } from 'react';
import { parseNumber } from './utils';
import RadixConverterShower from './radix-converter-shower';
import './index.less';
import { Input } from 'antd';

export const RadixConverter: FC = () => {
  const [inputRadix, setInputRadix] = useState(10);
  const [resultRadix, setResultRadix] = useState(2);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef<Input>(null);

  const handleInputRadixChange = (radix: number) => {
    setInputRadix(radix);
    setInput('');
    setResult('');
    inputRef.current?.focus();
  };

  const handleResultRadixChange = (radix: number) => {
    const newResult = input !== '' ? parseNumber(input, inputRadix).toString(radix) : '';
    setResult(newResult);
    setResultRadix(radix);
    inputRef.current?.focus();
  };

  const handleInputChange = (newInput: string) => {
    if (newInput === '') {
      setInput('');
      setResult('');
    } else if (!newInput.startsWith('-')) {
      // 不支持负数
      const newResult = parseNumber(newInput, inputRadix).toString(resultRadix);
      if (newResult !== 'NaN') {
        setInput(newInput);
        setResult(newResult);
      }
    }
  };

  return (
    <div className="radix-converter">
      <div className="title">
        进制转换：
        <span className="subtitle">支持 2~36 进制的整数及小数</span>
      </div>
      <div className="content">
        <RadixConverterShower
          ref={inputRef}
          className="input"
          radix={inputRadix}
          value={input}
          inputMode={true}
          addonBefore={'转换数字'}
          autoFocus
          onRadixChange={handleInputRadixChange}
          onInputChange={handleInputChange}
        />
        <RadixConverterShower
          className="result"
          radix={resultRadix}
          value={result}
          inputMode={false}
          addonBefore={'转换结果'}
          onRadixChange={handleResultRadixChange}
        />
      </div>
    </div>
  );
};
