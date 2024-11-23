import appRoutes from "@/routes";
import { BiHome } from "react-icons/bi";
import { CiLogin, CiLogout } from "react-icons/ci";
import { RiBookReadLine, RiNotification3Fill, RiUser3Line } from "react-icons/ri";

const links = [
    // { 
    //     id: "1",
    //     name: "Search", 
    //     href: appRoutes.search, 
    //     icon: (
    //         <RiMenuSearchFill/>
    //     )
    // },
    { 
        id: "1",
        name: "Notification", 
        href: appRoutes.notification, 
        icon: (
            <RiNotification3Fill/>
        )
    },
    { 
        id: "2",
        name: "Sign out", 
        href: appRoutes.signOut, 
        icon: (
            <CiLogout/>
        )
    },
]


const mainLinks = [
    { 
        id: "1",
        name: "Home", 
        href: appRoutes.home, 
        icon: (
            <BiHome/>
        )
    },
    { 
        id: "2",
        name: "About", 
        href: appRoutes.about, 
        icon: (
            <RiUser3Line/>
        ), 
    },
    { 
        id: "3",
        name: "Courses", 
        href: appRoutes.courses, 
        icon: (
            <RiBookReadLine/>
        ),
    },
]


class LinksService {
    #data = {
        mainLinks,
        links
    }; 
    links() {
        return this.#data.links;
    }
    mainLinks() {
        return this.#data.mainLinks;
    }
}

const headerLinksService = new LinksService();
export default headerLinksService;