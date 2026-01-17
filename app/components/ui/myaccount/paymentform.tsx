"use client";

import { useMemo, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PaymentMethodData = {
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

type AddPaymentFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	addPaymentMethod: (method: PaymentMethodData) => void;
};

export function AddPaymentForm({
	open,
	onOpenChange,
	addPaymentMethod,
}: AddPaymentFormProps) {
	const [name, setName] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cvc, setCvc] = useState("");
	const [line1, setLine1] = useState("");
	const [line2, setLine2] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [country, setCountry] = useState("");

	const brand = useMemo(() => {
		const n = cardNumber.replace(/\s+/g, "");
		if (/^4/.test(n)) return "visa";
		if (/^5[1-5]/.test(n)) return "mastercard";
		if (/^3[47]/.test(n)) return "amex";
		if (/^6(?:011|5)/.test(n)) return "discover";
		return "card";
	}, [cardNumber]);

	function maskCard(value: string) {
		return value
			.replace(/\D/g, "")
			.slice(0, 19)
			.replace(/(.{4})/g, "$1 ")
			.trim();
	}

	function maskExpiry(value: string) {
		const v = value.replace(/\D/g, "").slice(0, 4);
		if (v.length <= 2) return v;
		return `${v.slice(0, 2)}/${v.slice(2)}`;
	}

	const isValid = useMemo(() => {
		const n = cardNumber.replace(/\s+/g, "");
		const e = expiry.replace("/", "");
		return (
			name.trim().length > 2 &&
			n.length >= 13 &&
			e.length === 4 &&
			cvc.replace(/\D/g, "").length >= 3 &&
			line1.trim().length > 2 &&
			city.trim().length > 1 &&
			state.trim().length > 1 &&
			postalCode.trim().length > 2 &&
			country.trim().length > 1
		);
	}, [name, cardNumber, expiry, cvc, line1, city, state, postalCode, country]);

	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!isValid) return;
		const n = cardNumber.replace(/\s+/g, "");
		const eStr = expiry.replace("/", "");
		const expMonth = eStr.slice(0, 2);
		const expYear = eStr.slice(2);
		const method: PaymentMethodData = {
			id: `${Date.now()}`,
			brand,
			last4: n.slice(-4),
			expMonth,
			expYear,
			name,
			createdAt: new Date().toISOString(),
			address: {
				line1,
				line2: line2 || undefined,
				city,
				state,
				postalCode,
				country,
			},
		};
		addPaymentMethod(method);
		onOpenChange(false);
		setName("");
		setCardNumber("");
		setExpiry("");
		setCvc("");
		setLine1("");
		setLine2("");
		setCity("");
		setState("");
		setPostalCode("");
		setCountry("");
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle className="text-[#670009]">Add payment method</DialogTitle>
					<DialogDescription>
						Your details are encrypted and securely stored.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={onSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name on card</Label>
						<Input
							id="name"
							placeholder="Jane Doe"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							autoComplete="cc-name"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="card">Card number</Label>
						<Input
							id="card"
							inputMode="numeric"
							placeholder="1234 5678 9012 3456"
							value={cardNumber}
							onChange={(e) => setCardNumber(maskCard(e.target.value))}
							required
							autoComplete="cc-number"
						/>
						<p className="text-xs text-muted-foreground capitalize">{brand}</p>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-2">
							<Label htmlFor="exp">Expiry (MM/YY)</Label>
							<Input
								id="exp"
								inputMode="numeric"
								placeholder="MM/YY"
								value={expiry}
								onChange={(e) => setExpiry(maskExpiry(e.target.value))}
								required
								autoComplete="cc-exp"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="cvc">CVC</Label>
							<Input
								id="cvc"
								inputMode="numeric"
								placeholder="123"
								value={cvc}
								onChange={(e) =>
									setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
								}
								required
								autoComplete="cc-csc"
							/>
						</div>
					</div>

					<div className="space-y-2 pt-2">
						<Label>Billing address</Label>
						<div className="space-y-2">
							<Input
								placeholder="Address line 1"
								value={line1}
								onChange={(e) => setLine1(e.target.value)}
								required
								autoComplete="address-line1"
							/>
							<Input
								placeholder="Address line 2 (optional)"
								value={line2}
								onChange={(e) => setLine2(e.target.value)}
								autoComplete="address-line2"
							/>
							<div className="grid grid-cols-2 gap-3">
								<Input
									placeholder="City"
									value={city}
									onChange={(e) => setCity(e.target.value)}
									required
									autoComplete="address-level2"
								/>
								<Input
									placeholder="State/Province"
									value={state}
									onChange={(e) => setState(e.target.value)}
									required
									autoComplete="address-level1"
								/>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<Input
									placeholder="Postal code"
									value={postalCode}
									onChange={(e) => setPostalCode(e.target.value)}
									required
									autoComplete="postal-code"
								/>
								<Input
									placeholder="Country"
									value={country}
									onChange={(e) => setCountry(e.target.value)}
									required
									autoComplete="country-name"
								/>
							</div>
						</div>
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
                            className="cursor-pointer border-gray-700 text-gray-700 hover:bg-gray-50"
						>
							Cancel
						</Button>
						<Button type="submit" disabled={!isValid} className="bg-[#570009] text-white cursor-pointer">
							Save method
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
