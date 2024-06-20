// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import clsx from 'clsx';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faUserPlus, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

// const SideNav: React.FC = () => {
//     const pathname = usePathname();
//     const [token, setToken] = useState<string | null>(null);

//     useEffect(() => {
//         setToken(localStorage.getItem('token'));
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setToken(null);
//     };

//     const navItems = [
//         { href: "/", label: "CLIENT", icon: faUser },
//         { href: "/carer", label: "CARER", icon: faUserPlus },
//     ];

//     return (
//         <nav className="nav_color nav_margin w-48 md:w-64 min-h-screen">
//             <div className="p-4">
//                 <h1 className="text-white text-3xl font-bold mb-5">Care Guide</h1>
//             </div>
//             <ul className="text-white">
//                 {navItems.map(({ href, label, icon }) => (
//                     <li key={href} className={pathname === href ? "active" : ""}>
//                         <Link
//                             className={clsx(
//                                 'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-white-200 hover:text-black-600 md:flex-none md:justify-start md:p-2 md:px-3',
//                                 {
//                                     'bg-stone-200': pathname === href,
//                                     'text-black': pathname === href,
//                                 }
//                             )}
//                             style={{ borderRadius: pathname === href ? '10px 0 0 10px' : '' }}
//                             href={href}
//                         >
//                             <FontAwesomeIcon icon={icon}  className="nav_icon"/>
//                             <span className="hidden md:inline">{label}</span>
//                         </Link>
//                     </li>
//                 ))}
//                 {token ? (
//                     <li className={pathname === "/logout" ? "active" : ""}>
//                         <Link
//                             className={clsx(
//                                 'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-white-200 hover:text-black-600 md:flex-none md:justify-start md:p-2 md:px-3',
//                                 {
//                                     'bg-stone-200': pathname === "/logout",
//                                     'text-black': pathname === "/logout",
//                                 }
//                             )}
//                             style={{ borderRadius: pathname === "/logout" ? '10px 0 0 10px' : '' }}
//                             onClick={handleLogout}
//                             href="/login"
//                         >
//                             <FontAwesomeIcon icon={faSignOutAlt} className="nav_icon"/>
//                             <span className="hidden md:inline">LOGOUT</span>
//                         </Link>
//                     </li>
//                 ) : (
//                     <li className={pathname === "/login" ? "active" : ""}>
//                         <Link
//                             className={clsx(
//                                 'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-white-200 hover:text-black-600 md:flex-none md:justify-start md:p-2 md:px-3',
//                                 {
//                                     'bg-stone-200': pathname === "/login",
//                                     'text-black': pathname === "/login",
//                                 }
//                             )}
//                             style={{ borderRadius: pathname === "/login" ? '10px 0 0 10px' : '' }}
//                             href="/login"
//                         >
//                             <FontAwesomeIcon icon={faSignInAlt} className="nav_icon" />
//                             <span className="hidden md:inline">LOGIN</span>
//                         </Link>
//                     </li>
//                 )}
//             </ul>
//         </nav>
//     );
// };

// export default SideNav;


import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const SideNav: React.FC = () => {
    const pathname = usePathname();
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        router.push('/login');
    };

    const navItems = [
        { href: "/", label: "CLIENT", icon: faUser },
        { href: "/carer", label: "CARER", icon: faUserPlus },
    ];

    return (
        <nav className="nav_color nav_margin w-48 md:w-64 min-h-screen">
            <div className="p-4">
                <h1 className="text-white text-3xl font-bold mb-5">Care Guide</h1>
            </div>
            <ul className="text-white">
                {navItems.map(({ href, label, icon }) => (
                    <li key={href} className={pathname === href ? "active" : ""}>
                        <Link
                            className={clsx(
                                'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-white-200 hover:text-black-600 md:flex-none md:justify-start md:p-2 md:px-3',
                                {
                                    'bg-stone-200': pathname === href,
                                    'text-black': pathname === href,
                                }
                            )}
                            style={{ borderRadius: pathname === href ? '10px 0 0 10px' : '' }}
                            href={href}
                        >
                            <FontAwesomeIcon icon={icon} className="nav_icon" />
                            <span className="hidden md:inline">{label}</span>
                        </Link>
                    </li>
                ))}
                {token ? (
                    <li className={pathname === "/logout" ? "active" : ""}>
                        <button
                            className={clsx(
                                'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-white-200 hover:text-black-600 md:flex-none md:justify-start md:p-2 md:px-3',
                                {
                                    'bg-stone-200': pathname === "/logout",
                                    'text-black': pathname === "/logout",
                                }
                            )}
                            style={{ borderRadius: pathname === "/logout" ? '10px 0 0 10px' : '' }}
                            onClick={handleLogout}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="nav_icon" />
                            <span className="hidden md:inline">LOGOUT</span>
                        </button>
                    </li>
                ) : (
                    <li className={pathname === "/login" ? "active" : ""}>
                        <Link
                            className={clsx(
                                'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-white-200 hover:text-black-600 md:flex-none md:justify-start md:p-2 md:px-3',
                                {
                                    'bg-stone-200': pathname === "/login",
                                    'text-black': pathname === "/login"
                                }
                            )}
                            style={{ borderRadius: pathname === "/login" ? '10px 0 0 10px' : '' }}
                            href="/login"
                        >
                            <FontAwesomeIcon icon={faSignInAlt} className="nav_icon" />
                            <span className="hidden md:inline">LOGIN</span>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default SideNav;
