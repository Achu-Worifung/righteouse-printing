import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";
import { redirect } from "next/navigation";
export default function MyAccountPage() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        toast.error("You must be signed in to view your account.");
        redirect("/signin");
    }
  return (
    <div className="p-8">
      <UserAccountDetails />
      
    </div>
  );
}