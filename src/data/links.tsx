import AdminLayoutComp from "@/components/layout/admin";
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
    RiFolderSettingsLine,
    RiDashboard2Line,
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
    admin: NavLinksType 
    sideNav: NavLinksType
    sideNavFooter: NavLinksType
    publicSocialLinks: NavLinksType,
}

const ICON_CLASS_NAME = "nav-icon";

export const linkNames = {
    private: {
        home: "Home",
        profile: "Profile",
        courseReg: "Course Reg",
        courseForm: "Course Form",
        account: "My Account"
    }, 
    public: {
        landing: "Kuchtech",
        about: "About",
        courses: "Courses",
        contact: "Contact",
    },
    admin: {
        dashboard: 'Dashboard',
        login: 'Sign In',
        tokens: 'Student Tokens'
    }
}

export const linksRequireStudentId = [
    linkNames.private.courseReg, 
    linkNames.private.courseForm,
    linkNames.private.account,
    linkNames.private.profile
]

export const publicLinks = {
    admin: [
        {
            name: linkNames.admin.dashboard,
            icon: (
                <RiDashboard2Line/>
            ),
            href: appRoutes.admin.dashboard
        },
        // {
        //     name: linkNames.admin.login,
        //     icon: (
        //         <RiUser3Line/>
        //     ),
        //     href: appRoutes.admin.signIn
        // },
        {
            name: linkNames.admin.tokens,
            icon: (
                <RiFolderSettingsLine/>
            ),
            href: appRoutes.admin.studentTokens
        },
    ],
    sideNav: [
        {
            name: linkNames.private.home,
            icon: (
                <RiHome3Line/>
            ),
            href: appRoutes.home
        },
        {
            name: linkNames.private.account,
            icon: (
                <RiUser3Line/>
            ),
            href: appRoutes.account
        },
        {
            name: linkNames.private.courseReg,
            icon: (
                <RiFolderSettingsLine/>
            ),
            href: appRoutes.courseReg
        },
        {
            name: linkNames.private.courseForm,
            icon: (
                <RiBookReadLine/>
            ),
            href: appRoutes.courseForm
        }
    ],
    publicMain: [
        {
            name: linkNames.public.landing,
            icon: (
                <RiHome3Line/>
            ),
            href: appRoutes.index
        },
        {
            name: linkNames.public.about,
            icon: (
                <RiContactsLine/>
            ),
            href: appRoutes.about
        },
        {
            name: linkNames.public.courses,
            icon: (
                <RiBookReadLine/>
            ),
            href: appRoutes.courses
        },
        {
            name: linkNames.public.contact,
            icon: (
                <RiMapPin2Line/>
            ),
            href: appRoutes.contact
        },
    ],
    protectedMain: [
        {
            name: linkNames.private.home,
            icon: (
                <RiHome3Line/>
            ),
            href: appRoutes.home
        },
        {
            name: linkNames.private.profile,
            icon: (
                <RiUser3Line/>
            ),
            href: appRoutes.profile
        },
        {
            name: linkNames.private.courseForm,
            icon: (
                <RiBookReadLine/>
            ),
            href: appRoutes.courseForm
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
    getAdminLinks() {
        return this.data.admin;
    }
}


const linksService = new LinksService();
export default linksService;