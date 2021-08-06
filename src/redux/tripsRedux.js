/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // TODO - filter by duration
  if(filters.duration){
	 console.log(filters.duration); console.log(output); 
	 output = output.filter(trip => trip.days >= filters.duration.from && trip.days <= filters.duration.to);
  }
  
  // TODO - filter by tags
  if(filters.tags.length>0){
	let result = [];
    
	for(let tag of filters.tags){
	  const trips = output.filter(trip => trip.tags.includes(tag));
	  result = [...result, ...trips];
	}
	output = result;
  }
  // TODO - sort by cost descending (most expensive goes first)

  return output;
};

export const getTripById = ({trips}, tripId) => {
  const filtered = trips;

  // TODO - filter trips by tripId
  const result = filtered.filter(trip => trip.id === tripId);

  console.log('filtering trips by tripId:', tripId, filtered);
  return filtered.length ? result[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips;

  // TODO - filter trips by countryCode
  const result = filtered.filter(trip => trip.country.code === countryCode);
	
  console.log('filtering trips by countryCode:', countryCode, filtered);
  return filtered.length ? result : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
