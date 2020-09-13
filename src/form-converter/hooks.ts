import { useCallback, useRef, useState } from 'react';
import { checkFloatPart, floatLength, FloatType, splitFloat } from './utils';

export function useFloat(floatType: FloatType) {
  const [sign, setSign] = useState('');
  const [exponent, setExponent] = useState('');
  const [fraction, setFraction] = useState('');
  const inputtedRef = useRef(false);

  const wrappedSetSign = useCallback((value: string) => {
    setSign(value);
    inputtedRef.current = true;
  }, []);

  const wrappedSetExponent = useCallback((value: string) => {
    setExponent(value);
    inputtedRef.current = true;
  }, []);

  const wrappedSetFraction = useCallback((value: string) => {
    setFraction(value);
    inputtedRef.current = true;
  }, []);

  const setTotal = useCallback(
    (value: string, inputted = false) => {
      if (value === '') {
        setSign('');
        setExponent('');
        setFraction('');
      } else if (
        checkFloatPart(value, floatType, 'total') &&
        value.length === floatLength[floatType].total
      ) {
        const [sign, exponent, fraction] = splitFloat(value, floatType);
        setSign(sign);
        setExponent(exponent);
        setFraction(fraction);
      } else {
        throw new Error('Float format error');
      }
      inputtedRef.current = inputted;
    },
    [floatType]
  );

  return {
    sign,
    setSign: wrappedSetSign,
    exponent,
    setExponent: wrappedSetExponent,
    fraction,
    setFraction: wrappedSetFraction,
    get total() {
      const total = sign + exponent + fraction;
      return total.length === floatLength[floatType].total ? total : '';
    },
    get totalLength() {
      return (sign + exponent + fraction).length;
    },
    setTotal,
    hasInputted() {
      const inputted = inputtedRef.current;
      inputtedRef.current = false;
      return inputted;
    },
  };
}
