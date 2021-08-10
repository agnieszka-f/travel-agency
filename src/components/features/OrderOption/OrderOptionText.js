import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';

const OrderOptionText = (props) =>{
	const {currentValue, setOptionValue} = props;
	return (
	  <div className={styles.component}>
	    <input 
		     type='text'
		     value={currentValue}
		     onChange={event => setOptionValue(event.currentTarget.value)}
		/>
	  </div>
	);
}

export default OrderOptionText;