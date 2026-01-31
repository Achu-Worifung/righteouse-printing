import { toast } from "sonner";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserAccountDetails } from "@/components/ui/myaccount/user-account-details";
import { User, CreditCard, ShieldX, BellRing, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {PaymentMethod} from "@/components/ui/myaccount/payment-method";
import { PasswordForm } from "@/app/components/ui/myaccount/password-form";
import { AddressManager } from "@/components/ui/myaccount/address-manager";
export default async function MyAccountPage() {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get("authToken") !== undefined;
    if (!isAuthenticated) {
        toast.error("You must be signed in to view your account.");
        redirect("/signin");
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/auth/me/user`, {
        method: "GET",
        headers: {
            'Cookie': `authToken=${cookieStore.get("authToken")?.value}`
        }
    });
    const data = await res.json();
    if (!data.authenticated) {
        toast.error("You must be signed in to view your account.");
        redirect("/signin");
    }else 
    {
        console.log("User Data:", data.user);
    }

    return (
        <div className="px-8 lg:px-16">
            <h1 className="text-2xl sm:text-4xl text-[#570009] font-bold font-[Playfair Display]">Settings</h1>
            <p>Manage your account settings and preferences.</p>
            <Tabs
                defaultValue="personal-info"
                className=" mt-5 w-full"
            >
                <TabsList className="  mx-auto [&>button]:px-6 [&>button]:tracking-wide [&>button]:text-semibold hidden sm:flex  rounded-none">
                    <TabsTrigger value="personal-info" className="px-4 cursor-pointer">
                        <User />Personal Information
                    </TabsTrigger>
                   {
                    data.user.google ? null : (
                    <TabsTrigger value="password" className="px-4 cursor-pointer">
                        <ShieldX /> Change Password
                    </TabsTrigger>
                    )
                   }
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
                    <UserAccountDetails user = {data.user}/>
                </TabsContent>
                <TabsContent value="password">
                    <PasswordForm />
                </TabsContent>
                <TabsContent value="payment">
                    <PaymentMethod />
                </TabsContent>
                <TabsContent value="addresses">
                    <AddressManager 
                      initialAddresses={data.user.addresses || []}
                      userId={data.user._id}
                    />
                </TabsContent>
            </Tabs>
            {/* <Addresses addresses={data.user.addresses || []} />
      <Payment userId = {data.user._id} /> */}


        </div>
    );
}