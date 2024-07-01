'use client'
import Image from "next/image";
import NavLinks from "./nav-links";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const NavBar = () => {
    const t = useTranslations('navBar');
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative lg:flex-col  bg-white ">
            <div className="flex lg:flex-col lg:mt-10 justify-between items-center px-4 py-3 lg:justify-start">
                <div className="flex lg:flex-col items-center ">
                    <Image
                        priority={true}
                        className="block h-12 lg:h-52 w-auto"
                        src="/ordersync.png"
                        alt="OrderSync Logo"
                        width={120}
                        height={120}
                    />
                    <h1 className="ml-2 font-bold text-xl">
                        {t('title')}
                    </h1>
                </div>
                <div className="flex lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="block text-gray-500 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {/* Mobile menu */}
            {isOpen && (
                <div className="lg:hidden">
                    <NavLinks closeMenu={closeMenu} />
                </div>
            )}

            {/* Desktop menu */}
            <div className="hidden pl-5 lg:flex lg:flex-col justify-end pr-4">
                <NavLinks closeMenu={closeMenu} />
            </div>
        </div>
    );
};
