export type FloatType =
  | 'f32' // 2 进制表示的 32 位浮点数
  | 'f64'; // 2 进制表示的 64 位浮点数

export type ModeOfNumber =
  | 'd' // 10 进制整数或小数
  | FloatType;

export type FloatPartType = 'sign' | 'exponent' | 'fraction' | 'total';

/**
 * 将表示数字的字符串转换成另一种格式
 * @param input 表示数字的字符串
 * @param inputMode 输入字符串的格式
 * @param resultMode 输出字符串的格式
 * @returns 返回转换结果，如果输入无效返回空字符串
 */
export function convertFormOfNumber(
  input: string,
  inputMode: ModeOfNumber,
  resultMode: ModeOfNumber
) {
  const buffer = new ArrayBuffer(8);
  const dv = new DataView(buffer);

  let num: number;
  switch (inputMode) {
    case 'd':
      num = Number.parseFloat(input);
      if (isNaN(num) && input !== 'NaN' && input !== '-NaN') return '';
      break;
    case 'f32':
      if (!/^[01]{32}$/.test(input)) return '';
      dv.setUint32(0, Number.parseInt(input, 2));
      num = dv.getFloat32(0);
      break;
    case 'f64':
      if (!/^[01]{64}$/.test(input)) return '';
      dv.setUint32(0, Number.parseInt(input.slice(0, 32), 2));
      dv.setUint32(4, Number.parseInt(input.slice(32), 2));
      num = dv.getFloat64(0);
      break;
  }

  switch (resultMode) {
    case 'd':
      return num.toString();
    case 'f32':
      dv.setFloat32(0, Math.fround(num));
      return dv.getUint32(0).toString(2).padStart(32, '0');
    case 'f64':
      dv.setFloat64(0, num);
      return dv.getBigUint64(0).toString(2).padStart(64, '0');
  }
}

export const floatInfo: Record<FloatType, { length: number }> = {
  f32: { length: 32 },
  f64: { length: 64 },
};

const floatRegExp: Record<FloatType, Record<FloatPartType, RegExp>> = {
  f32: {
    sign: /^[01]{0,1}$/,
    exponent: /^[01]{0,8}$/,
    fraction: /^[01]{0,23}$/,
    total: /^[01]{0,32}$/,
  },
  f64: {
    sign: /^[01]{0,1}$/,
    exponent: /^[01]{0,11}$/,
    fraction: /^[01]{0,52}$/,
    total: /^[01]{0,64}$/,
  },
};

export function splitFloat(value: string, floatType: FloatType): [string, string, string] {
  switch (floatType) {
    case 'f32':
      return [value.slice(0, 1), value.slice(1, 9), value.slice(9)];
    case 'f64':
      return [value.slice(0, 1), value.slice(1, 12), value.slice(12)];
  }
}

export function checkFloatPart(
  part: string,
  floatType: FloatType,
  floatPartType: FloatPartType
): boolean {
  return floatRegExp[floatType][floatPartType].test(part);
}
