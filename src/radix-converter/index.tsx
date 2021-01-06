import { FC } from 'react';
import { useConverterState } from '../hook';
import RadixConverterShower from './radix-converter-shower';
import { parseNumber } from './utils';

function parseNumberWrapper(
  input: string,
  inputRadix: number,
  resultRadix: number
): string | null {
  if (input === '') {
    return '';
  }
  if (!input.startsWith('-')) {
    const result = parseNumber(input, inputRadix);
    return Number.isNaN(result) ? null : result.toString(resultRadix);
  }
  return null;
}

const RadixConverter: FC = () => {
  const {
    inputRef,
    input,
    result,
    inputMode,
    resultMode,
    handleInputChange,
    handleInputModeChange,
    handleResultModeChange,
  } = useConverterState<number, number>(10, 2, parseNumberWrapper);

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
          radix={inputMode}
          value={input}
          inputMode={true}
          addonBefore={'转换数字'}
          autoFocus
          onRadixChange={handleInputModeChange}
          onInputChange={handleInputChange}
        />
        <RadixConverterShower
          className="result"
          radix={resultMode}
          value={result}
          inputMode={false}
          addonBefore={'转换结果'}
          onRadixChange={handleResultModeChange}
        />
      </div>
    </div>
  );
};

export default RadixConverter;
