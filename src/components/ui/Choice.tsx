import { ComponentPropsWithoutRef } from 'react';

import styles from  '../../style/ui/сhoice.module.scss';
import { FormControl, } from '@mui/material';

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  defaultValue: string;
  options: {
    value: string,
    name: string
  }[];
}

const Choice:React.FC<SelectProps> = ( {defaultValue, options, ...props} ) => {



  return (
    <FormControl>
    <select 
      className={`${styles.uppercase_text} ${styles.select}`}
      defaultValue={defaultValue}
      {...props}
    >
      {
        options.map(option => {
          return (
            <option 
              key={option.value} 
              value={option.value} 
            >
              {option.name}
            </option>
          );
        })
      }
    </select>
    </FormControl>
  );
};

export default Choice;
