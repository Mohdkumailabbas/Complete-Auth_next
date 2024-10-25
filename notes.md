ek login page bnaya->usme humne loginform render kr diya -> login form me cardwrapper ko render kiya->me header footer sb define kr diya
from edit krna start kiya
The resolver is a function that integrates Zod validation with the form library.
zodResolver(LoginSchema) is a specific function that takes a Zod schema (LoginSchema in this case) and returns a resolver that can validate the form data against that schema. This ensures that when the form is submitted, the data is checked against the rules defined in LoginSchema.