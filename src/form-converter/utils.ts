export type ModeOfNumber =
  | 'd' // 10 进制整数或小数
  | 'f32' // 2 进制表示的 32 位浮点数
  | 'f64'; // 2 进制表示的 64 位浮点数

/**
 * 将表示数字的字符串转换成另一种格式
 * @param input 表示数字的字符串
 * @param inputMode 输入字符串的格式
 * @param resultMode 输出字符串的格式
 */
export function convertRepresentationOfNumber(
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
      if (isNaN(num) && input !== 'NaN' && input !== '-NaN') return null;
      break;
    case 'f32':
      if (!/^[01]{32}$/.test(input)) return null;
      dv.setUint32(0, Number.parseInt(input, 2));
      num = dv.getFloat32(0);
      break;
    case 'f64':
      if (!/^[01]{64}$/.test(input)) return null;
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
