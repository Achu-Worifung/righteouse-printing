"use client";
import Image from "next/image";
import { useState } from "react";
import { Trash2, PencilRuler } from "lucide-react";
// alert dialog imports removed as they're currently unused
import { AddPaymentForm } from "./paymentform";

export function PaymentMethod() {
  type StoredPaymentMethod = {
    id: string;
    brand: string;
    last4: string;
    expMonth: string;
    expYear: string;
    name: string;
    createdAt: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };

  const [paymentMethods, setPaymentMethods] = useState<StoredPaymentMethod[]>(
    []
  );
  const [addingMethod, setAddingMethod] = useState(false);
  const handleAdd = (method: StoredPaymentMethod) => {
    setPaymentMethods((prev) => [...prev, method]);
    setAddingMethod(false);
  };
  return (
    <>
      {/* add payment method dialog  */}
      <AddPaymentForm
        open={addingMethod}
        onOpenChange={setAddingMethod}
        addPaymentMethod={handleAdd}
      />
      
      <div className="border border-gray-300 max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md py-4 ">
        <h1 className=" text-xl md:text-3xl ">Payment Methods</h1>
        <p className="text-[#570009]">
          Manage your saved payment methods below.
        </p>
        {paymentMethods.length === 0  ? (
          <div className="w-full flex justify-center items-center flex-col">
            <Image
              src="/empty-wallet-remove.svg"
              alt="Payment Methods"
              width={100}
              height={100}
              className="mt-4"
            />
            <h1>No payment methods found</h1>
            <p className="text-center text-gray-500">
              You have not added any payment methods yet.
            </p>
            <button
              onClick={() => setAddingMethod(true)}
              className="bg-[#570009] text-white rounded-md px-4 py-2 mt-4 cursor-pointer"
            >
              Add Payment Method
            </button>

            <div className="mx-auto max-w-3xl mt-40 w-full">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <Image
                      className="h-8 w-auto"
                      src="https://www.svgrepo.com/show/499847/company.svg"
                      alt="Workflow logo"
                      width={32}
                      height={32}
                      unoptimized
                    />
                    <span className="font-medium text-gray-600 flex gap-2">
                      <PencilRuler className="hover:text-[#570009] cursor-pointer" />
                      <Trash2 className="hover:text-[#570009] cursor-pointer" />
                      <p>05/24</p>
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="font-bold text-gray-800 text-xl">
                      **** **** **** 1234
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-gray-600">
                        CARDHOLDER NAME
                      </div>
                      <Image
                        className="h-10 w-10"
                        src="https://www.svgrepo.com/show/362011/mastercard.svg"
                        alt="Mastercard logo"
                        width={40}
                        height={40}
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : // {/* visa cards start with 4, mastercard with 5, amex with 3 */}
        null}
      </div>
    </>
  );
}
