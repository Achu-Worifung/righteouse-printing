'use server';
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AccountTabs } from "@/app/components/ui/myaccount/account-tabs";

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
        <div className="px-2 lg:px-16 mt-4">
            <p
              className="relative font-serif text-3xl md:text-5xl text-forest mb-2 tracking-tighter text-left text-burgundy">
                Settings</p>
          <p className="text-softGray max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-lg text-left mb-10">
            Manage your account settings and preferences.
          </p>
            <AccountTabs user={data.user} />
        </div>
    );
}