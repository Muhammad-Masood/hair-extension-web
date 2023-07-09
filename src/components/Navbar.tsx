
import { MainNav } from "./Main-Nav"

export const Navbar = () => {
  return (
    <div className="h-16 flex items-center px-4">
        <div>
            <p>AmberLt</p>
        </div>
        <div>
            <MainNav className="mx-6"/>
        </div>
        <div className="ml-auto flex items-center">
          
        </div>
    </div>
  )
}
