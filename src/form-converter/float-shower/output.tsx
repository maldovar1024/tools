import { Input, message } from 'antd';
import { FC, useEffect } from 'react';
import { CopyButton } from '../../component/buttons';
import { useFloat } from './hooks';
import { floatLength, FloatType } from '../utils';

interface FloatOutputProp {
  value: string;
  floatType: FloatType;
  addonBefore: string;
}

const FloatOutput: FC<FloatOutputProp> = props => {
  const { floatType, addonBefore, value } = props;
  const { sign, exponent, fraction, total, setTotal } = useFloat(floatType);

  useEffect(() => {
    setTotal(value);
  }, [value, setTotal]);

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

  return (
    <div className="float-shower float-shower-output">
      <Input
        className="sign addon-before"
        value={sign}
        addonBefore={addonBefore}
        readOnly
      />
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

export default FloatOutput;
