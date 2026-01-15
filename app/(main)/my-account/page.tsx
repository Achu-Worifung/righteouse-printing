import { toast } from "sonner";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {UserAccountDetails} from "@/components/ui/myaccount/user-account-details";
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
    <div className="p-4">
      <UserAccountDetails user={data.user} />
      {/* <Addresses addresses={data.user.addresses || []} />
      <Payment userId = {data.user._id} /> */}

      
    </div>
  );
}