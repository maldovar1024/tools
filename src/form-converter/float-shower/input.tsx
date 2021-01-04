import { Input, message } from 'antd';
import React, {
  ClipboardEventHandler,
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import { ClearButton, CopyButton } from '../../component/buttons';
import {
  checkFloatPart,
  floatLength,
  FloatType,
  onInputChangeWrapper,
} from '../utils';
import { useFloat } from './hooks';

interface FloatInputProp {
  value: string;
  floatType: FloatType;
  addonBefore: string;
  autoFocus?: boolean;
  onInputChange: (input: string) => void;
}

const FloatInput = forwardRef<Input, FloatInputProp>((props, ref) => {
  const { floatType, value, addonBefore, onInputChange } = props;
  const {
    sign,
    setSign,
    exponent,
    setExponent,
    fraction,
    setFraction,
    total,
    setTotal,
  } = useFloat(floatType);
  const exponentInputRef = useRef<Input>(null);
  const fractionInputRef = useRef<Input>(null);

  useEffect(() => {
    if (value === '') {
      // 输入模式下只有 value 为空时设置
      setTotal(value);
    }
  }, [value, setTotal]);

  useEffect(() => {
    onInputChange(total);
  }, [onInputChange, total]);

  const handleSignChange = onInputChangeWrapper(part => {
    if (checkFloatPart(part, floatType, 'sign')) {
      setSign(part);
      if (
        part.length === floatLength[floatType].sign &&
        exponentInputRef.current
      ) {
        exponentInputRef.current.focus();
      }
    }
  });

  const handleExponentChange = onInputChangeWrapper(part => {
    if (checkFloatPart(part, floatType, 'exponent')) {
      setExponent(part);
      if (
        part.length === floatLength[floatType].exponent &&
        fractionInputRef.current
      ) {
        fractionInputRef.current.focus();
      }
    }
  });

  const handleFractionChange = onInputChangeWrapper(part => {
    if (checkFloatPart(part, floatType, 'fraction')) {
      setFraction(part);
    }
  });

  const handleCopy = () => {
    if (total.length === floatLength[floatType].total) {
      window.navigator.clipboard
        .writeText(total)
        .then(() => {
          message.success('复制成功', 1);
        })
        .catch(() => {
          message.error('复制失败', 1);
        });
    }
  };

  const handleClearAll = () => setTotal('');

  const handlePaste: ClipboardEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    const content = e.clipboardData.getData('text');
    if (checkFloatPart(content, floatType, 'total')) {
      if (content.length === floatLength[floatType].total) {
        setTotal(content);
      } else {
        const target = e.target as HTMLInputElement;
        const part = target.dataset.part;
        switch (part) {
          case 'sign':
            setSign(content.slice(0, floatLength[floatType].sign));
            break;
          case 'exponent':
            setExponent(content.slice(0, floatLength[floatType].exponent));
            break;
          case 'fraction':
            setFraction(content.slice(0, floatLength[floatType].fraction));
            break;
        }
      }
    } else {
      message.error('格式错误', 1);
    }
  };

  return (
    <div className="float-shower float-shower-input" onPaste={handlePaste}>
      <Input
        ref={ref}
        className="sign addon-before"
        data-part="sign"
        value={sign}
        addonBefore={addonBefore}
        autoFocus={props.autoFocus}
        onChange={handleSignChange}
      />
      <Input
        className="exponent addon-after"
        data-part="exponent"
        ref={exponentInputRef}
        value={exponent}
        onChange={handleExponentChange}
        addonAfter={<span className="input-length">{exponent.length}</span>}
        allowClear
      />
      <Input
        className="fraction addon-after"
        data-part="fraction"
        ref={fractionInputRef}
        value={fraction}
        onChange={handleFractionChange}
        addonAfter={<span className="input-length">{fraction.length}</span>}
        allowClear
      />
      <CopyButton
        disabled={total.length !== floatLength[floatType].total}
        tip="复制"
        onCopy={handleCopy}
      />
      <ClearButton
        disabled={total.length === 0}
        tip="清除全部"
        onClick={handleClearAll}
      />
    </div>
  );
});

FloatInput.displayName = 'FloatInput';

export default FloatInput;
