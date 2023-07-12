import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";

export default async function Dashboard (){
  const session = await getServerSession(authOptions);
  console.log(session);
  if(!session || session?.user.role == 'USER'){
    return null;
    //redirect('/api/auth/signin');
  }
  return (
  <div>
    <div>Admin Dashboard</div>
  </div>
  )
}
