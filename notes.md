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
-> npx auth secret->setting up middleware->auth.config.ts(we can't use prisma but mdware works on edge so for smoothly run cb we should create auth.config)->create middleware

Setting up cred provider
authconfig (define cred provider)->login.ts 
login page done

sending emails
creat table->define function to gettokebbyemail and gettokenbyemail->define lib/token.ts->install uuid ->register.ts
setiting up resedn install it ->lib/mail.ts->after setting up-> register.tsx
emailverification
newVerification form->newverification.ts->callin newverification on submit



Reset password-> create reset-passwordpage-> resetform->design fronted-> create scheema fr validation->create action for handeling backend data->creating db schema for creating token->resetpassword.ts in/auth/data->add fn in token.ts in /lib->mail.ts->reset.ts

creating newpassword form
create a page->form->schmema->design form->extract token from url->create server action

**2fa
update db->create two factor.ts->twofactorconfirmation.ts
->token.tstok->mail.ts->auth.ts->login.ts->now add schema and add code fiel in login page->login destruce code

userbutton
create server action->logout.ts



//note:-
// If the value is "truthy" (e.g., a non-zero number, a non-empty string, an object), ! will convert it to false.
// If the value is "falsy" (e.g., null, undefined, 0, NaN, ""), ! will convert it to true.
// !!value will return true if value is truthy.
// !!value will return false if value is falsy.
nextUrl:. It provides information about the current route that the user is trying to access before any redirection takes place.When a user makes a request to a page in a Next.js application, that request will have a URL associated with it. nextUrl captures this URL, which is useful for various purposes, including redirection.
Purpose of new URL(def