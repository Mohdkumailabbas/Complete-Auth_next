ek login page bnaya->usme humne loginform render kr diya -> login form me cardwrapper ko render kiya->me header footer sb define kr diya
from edit krna start kiya
The resolver is a function that integrates Zod validation with the form library.
zodResolver(LoginSchema) is a specific function that takes a Zod schema (LoginSchema in this case) and returns a resolver that can validate the form data against that schema. This ensures that when the form is submitted, the data is checked against the rules defined in LoginSchema.
setting up prisma
npx i prisma -> npx prisma init-> url from neondb->genrate->db.ts->npx db push(syncs your Prisma schema changes directly to your Neon database without needing migrations.)->user table will be created in db
go to auth js ->adapters->prisma make models->genrate->push
setting up next auth
authjs->install->auth.ts->copy paster
->api/auth/[nextauth]/route->paste
-> npx auth secret