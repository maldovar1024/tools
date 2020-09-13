import { useCallback, useState } from 'react';
import { checkFloatPart, floatInfo, FloatType, splitFloat } from './utils';

export function useFloat(floatType: FloatType) {
  const [sign, setSign] = useState('');
  const [exponent, setExponent] = useState('');
  const [fraction, setFraction] = useState('');

  const setTotal = useCallback(
    (value: string) => {
      if (value === '') {
        setSign('');
        setExponent('');
        setFraction('');
      } else if (
        checkFloatPart(value, floatType, 'total') &&
        value.length === floatInfo[floatType].length
      ) {
        const [sign, exponent, fraction] = splitFloat(value, floatType);
        setSign(sign);
        setExponent(exponent);
        setFraction(fraction);
      } else {
        throw new Error('Float format error');
      }
    },
    [floatType]
  );

  return {
    sign,
    setSign,
    exponent,
    setExponent,
    fraction,
    setFraction,
    get total() {
      const total = sign + exponent + fraction;
      return total.length === floatInfo[floatType].length ? total : '';
    },
    setTotal,
  };
}
