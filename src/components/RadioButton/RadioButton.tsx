import React from 'react';
import { ChartType } from '../../types/types';
import styles from './RadioButton.module.scss';

export interface IRadioButtonProps {
  option: ChartType;
  onChange: (option: ChartType) => void;
}

export const RadioButton = ({ option, onChange }: IRadioButtonProps) => {
  const getType = (value: string): ChartType => {
    return ChartType.Bar === value ? ChartType.Bar : ChartType.Line;
  };

  const handleChange = (value: string) => {
    onChange(getType(value));
  };

  return (
    <div
      className={styles['radio-container']}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}>
      <div className={styles['radio-container__radio-item']}>
        <input type="radio" value="bar" checked={option === ChartType.Bar} />
        <div>Bar Chart</div>
      </div>
      <div className={styles['radio-container__radio-item']}>
        <input type="radio" value="bine" checked={option === ChartType.Line} />
        <div>Line Chart</div>
      </div>
    </div>
  );
};
