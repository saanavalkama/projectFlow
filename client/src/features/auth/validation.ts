export const emailRules = {
  required: 'Email is required',
  pattern: {
  value: /^\S+@\S+\.\S+$/,
    message: 'Invalid email'
  }
}

export const passwordRules = {
  required: 'Password required',
  minLength: {
    value: 7,
    message: "Must be at least 7 charachters"
  },
  pattern:{
    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/,
    message:'Must include uppercase, number, and special character'
  }
}