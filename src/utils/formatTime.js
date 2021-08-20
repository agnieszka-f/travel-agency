export const formatTime = (seconds) => { 
	if(!seconds || 
	    typeof seconds ==='undefined' ||
		typeof seconds === 'string' ||
		typeof seconds === 'function' ||
		seconds < 0
	  ) return null;
	  else {
		let ss = (Math.floor(seconds%60) + '').padStart(2, '0');
		let mm = (Math.floor((seconds/60)%60) + '').padStart(2, '0');
		let hh = (Math.floor(seconds/3600) + '').padStart(2, '0');
		
		return hh+':'+mm+':'+ss;
	  } 
	
};