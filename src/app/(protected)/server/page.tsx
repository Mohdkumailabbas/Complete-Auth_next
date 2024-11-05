import { UserInfo } from "@/components/user-info";
import { CurrentUser } from "@/lib/auth";


const ServerPage=async()=>{
    const user = await CurrentUser()
    return(
        <div>
          <UserInfo  user={user}
            label ="💻Server Component"
          />
        </div>
    )

}
export default ServerPage;
