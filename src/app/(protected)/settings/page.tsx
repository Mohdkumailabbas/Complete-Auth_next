import { auth, signOut } from '@/auth';
import { Session } from '@auth/core/types'; // Import the Session type directly
import React from 'react';

const SettingsPage = async () => {
  const session: Session | null = await auth();

  return (
    <div>
      {session && session.user
        ? JSON.stringify(session)
        : "No session available"}
        <form action={async()=>{
          "use server"
          await signOut()
        }}>
       <button type='submit'> SignOUT</button>
        </form>
    </div>
  );
}

export default SettingsPage;
