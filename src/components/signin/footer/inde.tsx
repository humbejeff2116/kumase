import Link from 'next/link';
import styles from './index.module.css';


interface LoginAndSignupFooterProps {
    links: Array<any>  
}

export function LoginAndSignupFooter({
    links
}: LoginAndSignupFooterProps) {
    return (
        <div className = { styles.loginAndSignupContainer }>
            <div className = { styles.loginAndSignupCopy }>
                &copy; { new Date().getFullYear() } Kumase College of Health Technology
            </div>
            <div className = { styles.loginAndSignupLinksContainer }>
                <ul>
                {links.map((link, i) =>
                    <LoginAndSignupFooterLink { ...link } key = { i }/>
                )}
                </ul>
            </div>
        </div>
    )
}


interface LoginAndSignupFooterLinkProps {
    name: string
    href: string
}
function LoginAndSignupFooterLink({ 
    name, 
    href, 
    ...props 
}: LoginAndSignupFooterLinkProps) {
    return (
        <li>
            <Link href={href}>
                { name }
            </Link>
        </li>
    )
}