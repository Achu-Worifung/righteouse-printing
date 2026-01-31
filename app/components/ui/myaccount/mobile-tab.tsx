'use client';
import { User, CreditCard, ShieldX, BellRing, MapPin , Settings } from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import { useState } from 'react';
export function MobileTab({changeTab}: {changeTab: (tab: string) => void})
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const tabs = [
        {name: 'Personal Information', icon: User, value: 'personal-info'},
        {name: 'Change Password', icon: ShieldX, value: 'password'},
        {name: 'Payment Method', icon: CreditCard, value: 'payment'},
        {name: 'Notifications', icon: BellRing, value: 'notification'},
        {name: 'Address', icon: MapPin, value: 'addresses'},
    ];
    return (
        <AnimatePresence mode="wait">
            <motion.div className="flex flex-col gap-2 absolute bottom-4 right-4 text-ptext hover:text-burgundy hover:bg-gray-200 p-2 rounded-full cursor-pointer ">
                <Settings onClick={() =>{
                    setIsMenuOpen(!isMenuOpen)
                }}/>

              
            </motion.div>
              {
                    isMenuOpen && (
                        <motion.div
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 10}}
                            transition={{duration: 0.2}}
                            className="flex flex-col gap-2 absolute bottom-18 right-4 bg-gray-100 p-2 rounded-lg shadow-lg"
                        >
                            {tabs.map((tab, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: 10, width: 0, height: 0}}
                                    transition={{duration: 0.2, delay: index * 0.1}}
                                    className="flex items-center gap-2 rounded-lg py-2  cursor-pointer hover:text-burgundy"
                                    onClick={() => {
                                        changeTab(tab.value);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <tab.icon />
                                </motion.div>
                            ))}
                        </motion.div>
                    )
                }
        </AnimatePresence>
    );  

}