import { Input, message } from 'antd';
import React, { ClipboardEventHandler, FC, useEffect } from 'react';
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

const FloatShower: FC<FloatShowerProp> = props => {
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
    hasInputted,
  } = useFloat(floatType);

  useEffect(() => {
    setTotal(value);
  }, [value, setTotal]);

  useEffect(() => {
    if (hasInputted && props.inputMode) {
      props.onInputChange(total);
    }
  }, [props, total, hasInputted]);

  const handleSignChange = onInputChangeWrapper(part => {
    if (checkFloatPart(part, floatType, 'sign')) {
      setSign(part);
    }
  });

  const handleExponentChange = onInputChangeWrapper(part => {
    if (checkFloatPart(part, floatType, 'exponent')) {
      setExponent(part);
    }
  });

  const handleFractionChange = onInputChangeWrapper(part => {
    if (checkFloatPart(part, floatType, 'fraction')) {
      setFraction(part);
    }
  });

  const handleCopy = () => {
    if (total !== '') {
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
    setTotal('', true);
  };

  const handlePaste: ClipboardEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    const content = e.clipboardData.getData('text');
    if (checkFloatPart(content, floatType, 'total')) {
      if (content.length === floatLength[floatType].total) {
        setTotal(content, true);
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

  return inputMode ? (
    <div className="float-shower-input" onPaste={handlePaste}>
      <Input className="sign" data-part="sign" value={sign} onChange={handleSignChange} />
      <Input
        className="exponent addon-after"
        data-part="exponent"
        value={exponent}
        onChange={handleExponentChange}
        addonAfter={<span className="input-length">{exponent.length}</span>}
        allowClear
      />
      <Input
        className="fraction addon-after"
        data-part="fraction"
        value={fraction}
        onChange={handleFractionChange}
        addonAfter={<span className="input-length">{fraction.length}</span>}
        allowClear
      />
      <CopyButton disabled={total === ''} tip="复制" onCopy={handleCopy} />
      <ClearButton disabled={totalLength === 0} tip="清除全部" onClick={handleClearAll} />
    </div>
  ) : (
    <div className="float-shower-output">
      <Input className="sign" value={sign} readOnly />
      <Input className="exponent" value={exponent} readOnly />
      <Input className="fraction" value={fraction} readOnly />
      <CopyButton disabled={total === ''} tip="复制" onCopy={handleCopy} />
    </div>
  );
};

export default FloatShower;
