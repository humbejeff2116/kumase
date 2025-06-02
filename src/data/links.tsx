import appRoutes from "@/routes";
import { IconContext } from "react-icons";
import { BiCog, BiHome } from "react-icons/bi";
import { 
    FaFacebookSquare, 
    FaInstagramSquare, 
    FaLinkedin, 
    FaTiktok, 
    FaTwitter 
} from "react-icons/fa";

import { 
    RiBookReadLine, 
    RiContactsLine, 
    RiHome3Line, 
    RiLockLine, 
    RiUser3Line, 
    RiMapPin2Line,
} from "react-icons/ri";

export interface NavLink {
    name: string,
    href: string, 
    icon?: JSX.Element
}

export type NavLinksType = Array<NavLink>;

export interface Links {
    protectedMain: NavLinksType
    publicMain: NavLinksType

    sideNav: NavLinksType
    sideNavFooter: NavLinksType

    publicSocialLinks: NavLinksType,
}

const ICON_CLASS_NAME = "nav-icon";
export const publicLinks = {
    sideNav: [
        {
            name: "Home",
            icon: (
                <RiHome3Line/>
            ),
            href: appRoutes.home
        },
        {
            name: "Profile",
            icon: (
                <RiUser3Line/>
            ),
            href: appRoutes.profile
        },
        {
            name: "Course Reg",
            icon: (
                <RiBookReadLine/>
            ),
            href: appRoutes.courseReg
        },
        {
            name: "Course Form",
            icon: (
                <RiBookReadLine/>
            ),
            href: appRoutes.courseForm
        }
    ],
    publicMain: [
        {
            name: "KuchTech",
            icon: (
                <RiHome3Line/>
            ),
            href: appRoutes.index
        },
        {
            name: "About",
            icon: (
                <RiContactsLine/>
            ),
            href: appRoutes.about
        },
        {
            name: "Courses",
            icon: (
                <RiBookReadLine/>
            ),
            href: appRoutes.courses
        },
        {
            name: "Contact",
            icon: (
                <RiMapPin2Line/>
            ),
            href: appRoutes.contact
        },
    ],
    protectedMain: [
        {
            name: "Home",
            icon: (
                <RiHome3Line/>
            ),
            href: appRoutes.home
        },
        {
            name: "Profile",
            icon: (
                <RiUser3Line/>
            ),
            href: appRoutes.profile
        },
        {
            name: "Course Form",
            icon: (
                <RiUser3Line/>
            ),
            href: appRoutes.profile
        }
    ],
    sideNavFooter: [
        {
            name: "Terms",
            icon: (
                <RiBookReadLine/>
            ),
            href: appRoutes.terms
        },
        {
            name: "Privacy",
            icon: (
                <RiLockLine/>
            ),
            href: appRoutes.privacy
        },
        {
            name: "Settings",
            icon: (
                <BiCog/>
            ),
            href: appRoutes.settings
        }
    ],
    publicSocialLinks: [
        { 
            name: "Instagram", 
            href: "https://www.instagram.com/", 
            icon: (
                <IconContext.Provider value={{className: ICON_CLASS_NAME}}>
                    <FaInstagramSquare/>
                </IconContext.Provider>
            ) 
        },
        { 
            name: "Facebook", 
            href: "https://www.facebook.com/share/", 
            icon: (
                <IconContext.Provider value={{className: ICON_CLASS_NAME}}>
                    <FaFacebookSquare/>
                </IconContext.Provider>
            ) 
        },
        { 
            name: "Twitter", 
            href: "https://x.com/", 
            icon: (
                <IconContext.Provider value={{className: ICON_CLASS_NAME}}>
                    <FaTwitter/>
                </IconContext.Provider>
            ) 
        },
        { 
            name: "LinkedIn", 
            href: "https://www.linkedin.com/company/", 
            icon: (
                <IconContext.Provider value={{className: ICON_CLASS_NAME}}>
                    <FaLinkedin/>
                </IconContext.Provider>
            ) 
        },
        { 
            name: "Tik Tok", 
            href: "https://www.tiktok.com/", 
            icon: (
                <IconContext.Provider value={{className: ICON_CLASS_NAME}}>
                    <FaTiktok/>
                </IconContext.Provider>
            ) 
        },
    ],
}

class LinksService {
    data: Links = publicLinks;

    getProtectedMainLinks() {
        return this.data.protectedMain;
    }
    getPublicMainLinks() {
        return this.data.publicMain;
    }
    getSideNavLinks() {
        return this.data.sideNav;
    }
    getSideNavFooterLinks() {
        return this.data.sideNavFooter;
    }
    getPublicSocialLinks() {
        return this.data.publicSocialLinks;
    }
}


const linksService = new LinksService();
export default linksService;