module.exports = {

  attributes: {

    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    firstname: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    profile_image: {
        type: 'string'
    },
    phone: {
      type: 'number',
      // required: true
    },
    status: {
        type: 'string',
        isIn: ['active','inactive','blocked'],
        defaultsTo: 'inactive'
    },
    user_type: {
        type: 'string',
    },
    account_type: {
        type: 'string',
    },
    OTP: {
        type: 'string',
    },

  },

};

