import { MainNav } from "./main-nav"

export const Navbar = () => {
    return (
        <div className="border-b">
            <div className="flex items-center px-4 h-16">
                <div>
                AmberLt
                </div>
                <MainNav className="mx-6"/>
                <div>
                    Profile
                </div>
            </div>
        </div>
    )
}