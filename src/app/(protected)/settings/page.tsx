"use client"
import { logout } from "@/app/auth/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { BeatLoader } from "react-spinners";

const SettingsPage = () => {
  const user = useCurrentUser();
  const { status } = user ? { status: 'authenticated' } : { status: 'unauthenticated' };

  if (status === 'loading') {
    return <div><BeatLoader /></div>;
  }
  
  if (status === 'unauthenticated') {
    window.location.href = '/auth/login';
    return null;
  }

  const onClick = () => {
    logout();
  };

  return (
    <div>
      {/* {JSON.stringify(user)} */}
      <form>
        <button onClick={onClick} type="button">Sign OUT</button>
      </form>
    </div>
  );
};

export default SettingsPage;
