export const promoPrice = (cost, percent = 20) =>{
	
	return (typeof cost === 'number' && cost > 0) ? (cost - (cost*percent)/100) : null;
	
}