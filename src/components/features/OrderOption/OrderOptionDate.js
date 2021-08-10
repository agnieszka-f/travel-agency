import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderOptionDate = (props) =>{
	const {currentValue, setOptionValue} = props; 
	
	return (
	  <div className={styles.component}>
         <DatePicker  value={currentValue} selected={currentValue} onChange={(date)=>{setOptionValue(date)}}/>
	  </div>
	);
}

export default OrderOptionDate;