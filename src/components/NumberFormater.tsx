import React from 'react';

type Props = {
  number: number,
};

const NumberFormater = ({ number }: Props) => {
  let numberStr = '';
  let digits = 0;
  if (number > 0) {
    while (number > 0) {
      const digit = number % 10;
      if (digits > 0 && digits % 3 === 0) {
        numberStr = `,${numberStr}`;
      }
      numberStr = `${digit}${numberStr}`;
      number = Math.floor(number / 10);
      digits += 1;
    }
  } else {
    numberStr = '0';
  }
  return (
    <span>
      {numberStr}
    </span>
  );
};

export default NumberFormater;
