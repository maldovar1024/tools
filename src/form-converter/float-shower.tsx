import { Input, message } from 'antd';
import React, { FC, useEffect, useRef } from 'react';
import { ClearButton, CopyButton } from '../component/buttons';
import './float-shower.less';
import { useFloat } from './hooks';
import { checkFloatPart, floatLength, FloatType, onInputChangeWrapper } from './utils';

interface FloatShowerCommonProp {
  value: string;
  floatType: FloatType;
}

type FloatShowerProp = (
  | { inputMode: true; onInputChange: (input: string) => void }
  | { inputMode: false }
) &
  FloatShowerCommonProp;

export const FloatShower: FC<FloatShowerProp> = props => {
  const { floatType, inputMode, value } = props;
  const {
    sign,
    setSign,
    exponent,
    setExponent,
    fraction,
    setFraction,
    total,
    totalLength,
    setTotal,
  } = useFloat(floatType);
  const inputUpdatedRef = useRef(false);

  useEffect(() => {
    setTotal(value);
  }, [value, setTotal]);

  useEffect(() => {
    if (inputUpdatedRef.current && props.inputMode) {
      inputUpdatedRef.current = false;
      props.onInputChange(total);
    }
  }, [props, total]);

  const handleSignChange = onInputChangeWrapper(part => {
    if (checkFloatPart(part, floatType, 'sign')) {
      setSign(part);
      inputUpdatedRef.current = true;
    }
  });

  const handleExponentChange = onInputChangeWrapper(part => {
    if (checkFloatPart(part, floatType, 'exponent')) {
      setExponent(part);
      inputUpdatedRef.current = true;
    }
  });

  const handleFractionChange = onInputChangeWrapper(part => {
    if (checkFloatPart(part, floatType, 'fraction')) {
      setFraction(part);
      inputUpdatedRef.current = true;
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

  const handleClearAll = () => {
    setTotal('');
    inputUpdatedRef.current = true;
  };

  return inputMode ? (
    <div className="float-shower-input">
      <Input className="sign" value={sign} onChange={handleSignChange} />
      <Input
        className="exponent addon-after"
        value={exponent}
        onChange={handleExponentChange}
        addonAfter={<span className="input-length">{exponent.length}</span>}
        allowClear
      />
      <Input
        className="fraction addon-after"
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
      <ClearButton disabled={totalLength === 0} tip="清除全部" onClick={handleClearAll} />
    </div>
  ) : (
    <div className="float-shower-output">
      <Input className="sign" value={sign} readOnly />
      <Input className="exponent" value={exponent} readOnly />
      <Input className="fraction" value={fraction} readOnly />
      <CopyButton
        disabled={total.length !== floatLength[floatType].total}
        tip="复制"
        onCopy={handleCopy}
      />
    </div>
  );
};
