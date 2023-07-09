import {redirect} from "next/navigation";

export default function SetupLayout({children}:{children:React.ReactNode}){
    // const {userId} = auth();

    // if(!userId){   //checking if user is not logged in
    //     redirect('/sign-in');
    // }
    
    return(
        <>
        {children}
        </>
    )
}