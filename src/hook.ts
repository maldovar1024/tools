import { Input } from 'antd';
import { useRef, useState } from 'react';

export function useConverterState<I, R>(
  defaultInputMode: I,
  defaultResultMode: R,
  converter: (input: string, inputMode: I, resultMode: R) => string | null
) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [inputMode, setInputMode] = useState(defaultInputMode);
  const [resultMode, setResultMode] = useState(defaultResultMode);
  const inputRef = useRef<Input>(null);

  const handleInputChange = (newInput: string) => {
    const newResult = converter(newInput, inputMode, resultMode);
    if (newResult !== null) {
      setInput(newInput);
      setResult(newResult);
    }
  };

  const handleInputModeChange = (newMode: I) => {
    setInputMode(newMode);
    setInput('');
    setResult('');
    inputRef.current?.focus();
  };

  const handleResultModeChange = (newMode: R) => {
    setResultMode(newMode);
    const newResult = converter(input, inputMode, newMode);
    if (newResult !== null) {
      setResult(newResult);
    }
  };

  return {
    inputRef,
    input,
    result,
    inputMode,
    resultMode,
    handleInputChange,
    handleInputModeChange,
    handleResultModeChange,
  };
}
