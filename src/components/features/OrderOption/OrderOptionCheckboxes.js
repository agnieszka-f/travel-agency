import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import {formatPrice} from '../../../utils/formatPrice.js';

const newValueSet = (currentValue, id, checked) => {
  if(checked){
    return [
      ...currentValue,
      id,
    ];
  } else {
    return currentValue.filter(value => value != id);
  }
};

const OrderOptionCheckboxes = (props) =>{
	const {values, required, currentValue, setOptionValue} = props;
	return (
	 	<div className={styles.checkboxes}>
		  {
			values.map(value =>{
				return (
				  <label key={value.id}>
                    <input type='checkbox'
					       value={value.id}
						   checked={currentValue.includes(value.id)}
						   onChange={event=>setOptionValue(newValueSet(currentValue,value.id,event.currentTarget.checked))}
					/>{value.name}({formatPrice(value.price)})		  
				    
				  </label>
				);
			})
		  }
      </div>
	);
}

export default OrderOptionCheckboxes;