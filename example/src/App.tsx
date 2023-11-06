import React, { useState } from 'react';
import { ProgressBar } from 'anythink-ui';
import { css } from '@emotion/css';

export const App = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  return (
    <div style={{ height: '80vh', border: '4px solid #00f' }}>
      <button onClick={() => setIsDisabled(!isDisabled)}>set disabled</button>
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
    </div>
  );
};
