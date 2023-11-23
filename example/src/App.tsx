import React, { useState } from 'react';
import { Calendar, FieldDateCalendar, LiftUp, ProgressBar } from 'anythink-ui';
import { css } from '@emotion/css';
import dayjs from 'dayjs';

import localTH from 'dayjs/locale/th';
import NextIcon from './icons/NextIcon';

dayjs.locale(localTH);

let globalPopupRef = null as any;

export const App = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
  return (
    <>
      <LiftUp.Init globalPopupRef={globalPopupRef} />
      <div style={{ height: '80vh', border: '4px solid #00f' }}>
        <button onClick={() => setIsDisabled(!isDisabled)}>set disabled</button>
        <div style={{ fontSize: '72px' }}>
          <NextIcon /> <NextIcon />
        </div>
        <ProgressBar
          className="progressbar-default"
          activeKey="qrs"
          progressPercent={75}
          items={[
            { key: 'abc', pointLabel: '1', label: 'abc' },
            { key: 'def', pointLabel: '1', label: 'def' },
            { key: 'ghi', pointLabel: '1', label: 'ghi' },
            { key: 'jkl', pointLabel: '2', label: 'fff', disabled: isDisabled },
            { key: 'mno', pointLabel: '2', label: 'fff', disabled: isDisabled },
            { key: 'qrs', pointLabel: '2', label: 'fff', disabled: isDisabled },
            { key: 'xyz', pointLabel: '2', label: 'fff', disabled: isDisabled },
          ]}
        />
        <div>
          <Calendar value={dayjs()} />
        </div>

        {/* <LiftUp.slideUp show>xxxx</LiftUp.slideUp>
        <LiftUp.slideUp show>xxxx</LiftUp.slideUp>
        <LiftUp.slideUp show>xxxx</LiftUp.slideUp> */}
        <FieldDateCalendar value={date.format('YYYY-MM-DD')} onChangeDate={(d) => setDate(d)} />
      </div>
    </>
  );
};
