import React from 'react';
import styles from './DefaultLayout.module.scss';
import { ChartComponent } from '../ChartComponent/ChartComponent';
import { ChartType } from '../../types/types';
import { RadioButton } from '../RadioButton/RadioButton';

interface IConfirmChanges {
  (event: React.KeyboardEvent, setChange: (arr: string[]) => void, changeArr: string[]): void;
}

interface IEditBlur {
  (event: React.FocusEvent, setChange: (arr: string[]) => void, changeArr: string[]): void;
}

export const DefaultLayout = () => {
  const [xItems, setXitems] = React.useState<string[]>([]);
  const [yItems, setYitems] = React.useState<string[]>([]);
  const [tempXitems, setTempXitems] = React.useState<string[]>([]);
  const [tempYitems, setTempYitems] = React.useState<string[]>([]);
  const [chartType, setChartType] = React.useState<ChartType>(ChartType.Bar);
  const [error, setError] = React.useState<boolean>(false);

  const isCorrectYvalue = (value: string) => {
    return (
      (typeof Number(value.at(-1)) === 'number' && !isNaN(Number(value.at(-1)))) ||
      value.at(-1) === ',' ||
      value === ''
    );
  };

  const confirmChanges: IConfirmChanges = (event, setChange, changeArr) => {
    if (event.key === 'Enter') {
      setChange(changeArr);
    }
  };

  const editBlur: IEditBlur = (event, setChange, changeArr) => {
    setChange(changeArr);
  };

  return (
    <div className={styles['wrapper']}>
      <div>
        <p>X axis labels:</p>
        <input
          className={styles['input-area']}
          type="text"
          value={tempXitems}
          onBlurCapture={(event: React.FocusEvent) => editBlur(event, setXitems, tempXitems)}
          onKeyDown={(e: React.KeyboardEvent) => confirmChanges(e, setXitems, tempXitems)}
          onChange={(e) => setTempXitems(e.target.value.split(','))}
        />
        <p>Y axis values:</p>
        <input
          className={styles['input-area']}
          onBlurCapture={(event: React.FocusEvent) => editBlur(event, setYitems, tempYitems)}
          onKeyDown={(e: React.KeyboardEvent) => confirmChanges(e, setYitems, tempYitems)}
          type="text"
          value={tempYitems}
          onChange={(e) => {
            if (isCorrectYvalue(e.target.value)) {
              setError(false);
              setTempYitems(e.target.value.split(','));
            } else {
              setError(true);
            }
          }}
        />
        {error && <p className={styles['error']}>Y axis values should be numbers</p>}
        <ChartComponent xItems={xItems} yItems={yItems} chartType={chartType} />
        <RadioButton option={chartType} onChange={setChartType} />
      </div>
    </div>
  );
};
