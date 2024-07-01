'use client'
import { AdjustmentsVerticalIcon, ShoppingBagIcon, ShoppingCartIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks({ closeMenu }:{closeMenu:()=>void}) {
    const handleLinkClick = () => {
        closeMenu();
    };
    const t = useTranslations('navLinks');
    const pathname = usePathname();
    const links = [
        {
            title: t('metrics'),
            href: '/',
            icon: AdjustmentsVerticalIcon

        },
        {
            title: t('orders'),
            href: '/orders',
            icon: ShoppingBagIcon
        },
        {
            title: t('createNewOrder'),
            href: '/create-order',
            icon: ShoppingCartIcon
        },
        {
            title: t('customers'),
            href: '/customers',
            icon: UserIcon
        },
        {
            title: t('createNewCustomer'),
            href: '/create-customers',
            icon: UserPlusIcon
        }
    ];

    return (
        <>
            {links.map((link, index) => (
                <Link key={index} href={link.href} onClick={handleLinkClick}  className={`${pathname === link.href ? 'rounded-lg  bg-gray-200 text-blue-950 ' : ''} flex items-center p-2 text-gray-700 font-bold hover:bg-gray-100 mb-4 hover:text-gray-900`} >
                    <link.icon className="w-6 h-6 mr-2" />
                    {link.title}
                </Link >
            ))
            }
        </>
    );
}
