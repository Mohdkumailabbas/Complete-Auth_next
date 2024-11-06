"use client"
import { settings } from "@/app/auth/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { BeatLoader } from "react-spinners";

const SettingsPage = () => {
  const user = useCurrentUser();
  const{update}=useSession()
  const[isPending,startTransition]=useTransition()
  const { status } = user ? { status: 'authenticated' } : { status: 'unauthenticated' };
  if (status === 'loading') {
    return <div><BeatLoader /></div>;
  }
  
  if (status === 'unauthenticated') {
    window.location.href = '/auth/login';
    return null;
  }

  const onClick = () => {
    startTransition(()=>{
      settings({name:"kumailll"

      }).then(()=>{
        update()
      });
      
    })
  };

  return (
    <Card className="w-[550px] mt-4 shadow-md">
      <CardHeader>
        <p className="text-xl font-semibold text-center ">
        ⚙️ Settings
        </p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>Update Name</Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
