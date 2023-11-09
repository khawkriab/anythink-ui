function splitIntoRows(data: Array<any> = [], rowSize = 1) {
  const result = [];
  let _rowSize = rowSize;

  for (let i = 0; i < data.length; i += _rowSize) {
    result.push(data.slice(i, i + _rowSize));
  }

  return result;
}

function runArrays(start: number, end: number, last = false, next = false) {
  const result = [];

  for (let i = start; i <= end; i++) {
    result.push({
      label: i,
      last: last,
      next: next,
    });
  }

  return result;
}

function getDecadeBetween(year = 10) {
  const decade = 10;
  const decadeStart = year - (year % decade);
  const decadeEnd = decadeStart + decade;

  return {
    start: decadeStart,
    end: decadeEnd - 1,
  };
}

function zeroPad(value: number | string, length?: number) {
  const padLength = length && length > 1 ? length : 2;
  const strValue = String(value);

  if (padLength === 0 || strValue.length > padLength) return strValue;

  const paddedNo = padLength - strValue.length;
  const pad = Array(paddedNo).fill('0').join('');

  return pad + strValue;
}

export { splitIntoRows, runArrays, getDecadeBetween, zeroPad };
