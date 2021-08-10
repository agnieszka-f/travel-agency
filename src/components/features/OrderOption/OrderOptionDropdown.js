import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import {formatPrice} from '../../../utils/formatPrice.js';

const OrderOptionDropdown = (props) =>{ 
	const {values, required, currentValue, setOptionValue} = props;
	return (
	  <select
        className={styles.dropdown}
        value={currentValue}
        onChange={event => setOptionValue(event.currentTarget.value)}
      >
        {required ? '' : (
          <option key='null' value=''>---</option>
        )}
       {values.map(value => (
         <option key={value.id} value={value.id}>{value.name} ({formatPrice(value.price)})</option>
      ))}
  </select>
);
}

export default OrderOptionDropdown;