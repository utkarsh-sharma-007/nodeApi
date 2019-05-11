module.exports = {

  attributes: {
  
    user_id: {
    	type: 'number'
    },
    mobile_number: {
    	type:'number'
    },
    gender: {
    	type: 'string'
    },
    dob: {
    	type: 'ref',
    	columnType: 'datetime'
    },
    house_number: {
    	type: 'string'
    },
    street: {
    	type: 'string'
    },
    city: {
    	type: 'string'
    },
    state: {
    	type: 'string'
    },
    country: {
    	type: 'string'
    },
    pincode: {
    	type: 'string'
    },
    
  },

};

