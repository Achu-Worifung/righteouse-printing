'use client';

import { useState } from "react";
import { User, CreditCard, ShieldX, BellRing, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAccountDetails } from "@/components/ui/myaccount/user-account-details";
import { PaymentMethod } from "@/components/ui/myaccount/payment-method";
import { PasswordForm } from "@/components/ui/myaccount/password-form";
import { AddressManager } from "@/components/ui/myaccount/address-manager";
import { MobileTab } from "@/components/ui/myaccount/mobile-tab";

interface AccountTabsProps {
  user: any;
}

export function AccountTabs({ user }: AccountTabsProps) {
  const [activeTab, setActiveTab] = useState("personal-info");

  return (
    <>
      <MobileTab changeTab={setActiveTab} />
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-5 w-full"
      >
        <TabsList className="mx-auto [&>button]:px-6 [&>button]:tracking-wide [&>button]:text-semibold hidden sm:flex rounded-none">
          <TabsTrigger value="personal-info" className="px-4 cursor-pointer">
            <User />Personal Information
          </TabsTrigger>
          {!user.google && (
            <TabsTrigger value="password" className="px-4 cursor-pointer">
              <ShieldX /> Change Password
            </TabsTrigger>
          )}
          <TabsTrigger value="payment" className="px-4 cursor-pointer">
            <CreditCard />Payment
          </TabsTrigger>
          <TabsTrigger value="addresses" className="px-4 cursor-pointer">
            <MapPin />Addresses
          </TabsTrigger>
          <TabsTrigger value="notification" className="px-4 cursor-pointer hover:text-hovertext">
            <BellRing /> Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info" className="py-4">
          <UserAccountDetails user={user} />
        </TabsContent>
        <TabsContent value="password">
          <PasswordForm />
        </TabsContent>
        <TabsContent value="payment">
          <PaymentMethod />
        </TabsContent>
        <TabsContent value="addresses">
          <AddressManager 
            initialAddresses={user.addresses || []}
            userId={user._id}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
