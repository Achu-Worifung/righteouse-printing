export function UserAccountPayment({ userId }: { userId: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
      {/* Payment methods UI goes here */}
      <p>User ID: {userId}</p>
    </div>
  );
}