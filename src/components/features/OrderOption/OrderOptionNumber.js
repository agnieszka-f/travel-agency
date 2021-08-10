import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';

const OrderOptionNumber = (props) =>{
	const {values, required, currentValue, setOptionValue, limits} = props;
	return (
	  <div className={styles.number}>
	   <input type='number'
              className={styles.inputSmall}
			  value={currentValue}
			  min={limits.min}
			  max={limits.max}
			  onChange={event => setOptionValue(event.currentTarget.value)}
	   />
	  </div>
	);
}

export default OrderOptionNumber;