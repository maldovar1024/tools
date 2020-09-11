/**
 * 生成一个等差数列
 * @param start 起始值
 * @param end 终止值（不含）
 * @param step 步长（默认为 1）
 */
export function* range(start: number, end: number, step = 1) {
  if (step > 0 && end > start) {
    for (let i = start; i < end; i += step) {
      yield i;
    }
  } else if (step < 0 && end < start) {
    for (let i = start; i > end; i += step) {
      yield i;
    }
  }
}

/**
 * 将字符串按基数 radix 转换成数字，输入不符合规则时返回 NaN
 * @param str 要转换成数字的字符串，可以为整数或定点表示的小数
 * @param radix 转换的基数（2~36），默认为 10
 */
export function parseNumber(str: string, radix = 10) {
  if (radix < 2 || radix > 36) {
    return NaN;
  }

  // 匹配输入字符串的正则表达式
  // 捕获组 1 匹配负号
  // 捕获组 2 匹配整数部分
  // 捕获组 3 匹配小数部分
  let pattern: RegExp;
  if (radix <= 10) {
    pattern = new RegExp(`^(-?)([0-${radix - 1}]*)\\.?([0-${radix - 1}]*)$`, 'i');
  } else if (radix === 11) {
    pattern = new RegExp(`^(-?)([0-9A]*)\\.?([0-9A]*)$`, 'i');
  } else {
    let letter = String.fromCharCode('A'.charCodeAt(0) + radix - 11);
    pattern = new RegExp(`^(-?)([0-9A-${letter}]*)\\.?([0-9A-${letter}]*)$`, 'i');
  }

  const match = pattern.exec(str);
  if (match === null || (match[2] === '' && match[3] === '')) {
    return NaN;
  }

  const sign = match[1] ? -1 : 1;
  const [integer, decimal] = [match[2], match[3]];

  let sum = 0;
  for (let i = 0, base = 1 / radix; i < decimal.length; i++, base /= radix) {
    sum += Number(decimal[i]) * base;
  }

  if (integer !== '') {
    sum += Number.parseInt(integer, radix);
  }

  return sum * sign;
}
