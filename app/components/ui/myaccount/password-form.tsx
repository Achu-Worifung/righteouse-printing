"use client";
import { Label } from "../label";
import { Input } from "../input";
import { SaveChangesBtn } from "./save-changes-btn";
import Link from "next/link";
import { EyeClosed, Eye, Check, X } from "lucide-react";
import { useState } from "react";
import { PasswordValidation } from "@/lib/types";

export function PasswordForm() {
  const [passwordVisible, setPasswordVisible] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecialChar: false,
    });
  const [showValidation, setShowValidation] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [showMatchValidation, setShowMatchValidation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (pass: string) => {
    const validation: PasswordValidation = {
      minLength: pass.length >= 8,
      hasUppercase: /[A-Z]/.test(pass),
      hasLowercase: /[a-z]/.test(pass),
      hasNumber: /\d/.test(pass),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass),
    };

    setPasswordValidation(validation);
    return Object.values(validation).every((v) => v);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword({ ...password, new: newPassword });

    if (newPassword.length > 0) {
      const isValid = validatePassword(newPassword);
      setShowValidation(!isValid);
    } else {
      setShowValidation(false);
    }

    // Check if confirm password matches
    if (password.confirm.length > 0) {
      setPasswordsMatch(newPassword === password.confirm);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const confirmPassword = e.target.value;
    setPassword({ ...password, confirm: confirmPassword });

    // Only show match validation if new password is valid
    const isNewPasswordValid = Object.values(passwordValidation).every(
      (v) => v,
    );

    if (confirmPassword.length > 0 && isNewPasswordValid) {
      setShowMatchValidation(true);
      setPasswordsMatch(password.new === confirmPassword);
    } else {
      setShowMatchValidation(false);
    }
  };

  const handlePasswordChange = async () => {
    // Validate all fields
    if (!password.current.trim()) {
      alert("Please enter your current password");
      return;
    }

    const isNewPasswordValid = Object.values(passwordValidation).every(
      (v) => v,
    );
    if (!isNewPasswordValid) {
      alert("Please ensure new password meets all requirements");
      return;
    }

    if (!passwordsMatch || password.confirm !== password.new) {
      alert("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/me/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: password.current,
          newPassword: password.new,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Password changed successfully!");
        // Reset form
        setPassword({ current: "", new: "", confirm: "" });
        setShowValidation(false);
        setShowMatchValidation(false);
      } else {
        alert(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="border border-gray-300 max-w-3xl mx-auto p-4 bg-offwhite rounded-lg shadow-md grid grid-cols-1 gap-4  py-4 mb-4 ">
      <div>
        <p className=" relative font-serif text-3xl md:text-5xl text-forest mb-2 tracking-tighter text-center">
          Change Password
        </p>
        <p className="text-softGray max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-lg text-center mb-10">
          Update your password below.
        </p>
      </div>
      <div className="w-full py-4 space-y-3">
        <span className="flex justify-between items-center ">
          <Label htmlFor="current-password">Current Password</Label>
          <Link
            href="/loginhelp"
            className="ml-auto text-sm  underline-offset-2 hover:underline"
          >
            Forgot your password?
          </Link>
        </span>
        <span className="flex justify-between items-center border border-muted-foreground/50 rounded-none focus-within:ring-2 focus-within:ring-burgundy focus-within:ring-offset-2 focus-within:border-burgundy">
          <Input
            id="current-password"
            required
            onChange={(e) => {
              setPassword({ ...password, current: e.target.value });
            }}
            type={passwordVisible.current ? "text" : "password"}
            className="py-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 border-none outline-none"
          />
          {passwordVisible.current ? (
            <Eye
              className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
              onClick={() =>
                setPasswordVisible({ ...passwordVisible, current: false })
              }
            />
          ) : (
            <EyeClosed
              className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
              onClick={() =>
                setPasswordVisible({ ...passwordVisible, current: true })
              }
            />
          )}
        </span>
      </div>
      <div className="w-full py-4 space-y-3">
        <span className="flex justify-between items-center ">
          <Label htmlFor="new-password">New Password</Label>
        </span>
        <span className="flex justify-between items-center border border-muted-foreground/50 rounded-none focus-within:ring-2 focus-within:ring-burgundy focus-within:ring-offset-2 focus-within:border-burgundy">
          <Input
            id="new-password"
            required
            onChange={handleNewPasswordChange}
            value={password.new}
            type={passwordVisible.new ? "text" : "password"}
            className="py-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 border-none outline-none"
          />
          {passwordVisible.new ? (
            <Eye
              className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
              onClick={() =>
                setPasswordVisible({ ...passwordVisible, new: false })
              }
            />
          ) : (
            <EyeClosed
              className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
              onClick={() =>
                setPasswordVisible({ ...passwordVisible, new: true })
              }
            />
          )}
        </span>
        {showValidation && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
            <p className="text-sm font-medium text-gray-900 mb-3">
              Password Requirements:
            </p>
            <div
              className={`flex items-center gap-2 text-sm ${
                passwordValidation.minLength
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {passwordValidation.minLength ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
              At least 8 characters
            </div>
            <div
              className={`flex items-center gap-2 text-sm ${
                passwordValidation.hasUppercase
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {passwordValidation.hasUppercase ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
              One uppercase letter
            </div>
            <div
              className={`flex items-center gap-2 text-sm ${
                passwordValidation.hasLowercase
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {passwordValidation.hasLowercase ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
              One lowercase letter
            </div>
            <div
              className={`flex items-center gap-2 text-sm ${
                passwordValidation.hasNumber
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {passwordValidation.hasNumber ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
              One number
            </div>
            <div
              className={`flex items-center gap-2 text-sm ${
                passwordValidation.hasSpecialChar
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {passwordValidation.hasSpecialChar ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
              One special character (!@#$%^&*)
            </div>
          </div>
        )}
      </div>
      <div className="w-full py-4 space-y-3">
        <span className="flex justify-between items-center ">
          <Label htmlFor="confirm-new-password">Confirm New Password</Label>
        </span>
        <span className="flex justify-between items-center border border-muted-foreground/50 rounded-none focus-within:ring-2 focus-within:ring-burgundy focus-within:ring-offset-2 focus-within:border-burgundy">
          <Input
            id="confirm-new-password"
            required
            value={password.confirm}
            onChange={handleConfirmPasswordChange}
            type={passwordVisible.confirm ? "text" : "password"}
            className="py-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 border-none outline-none"
          />
          {passwordVisible.confirm ? (
            <Eye
              className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
              onClick={() =>
                setPasswordVisible({ ...passwordVisible, confirm: false })
              }
            />
          ) : (
            <EyeClosed
              className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
              onClick={() =>
                setPasswordVisible({ ...passwordVisible, confirm: true })
              }
            />
          )}
        </span>
        {showMatchValidation && (
          <div
            className={`mt-2 flex items-center gap-2 text-sm ${
              passwordsMatch ? "text-green-600" : "text-red-600"
            }`}
          >
            {passwordsMatch ? (
              <Check className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
            {passwordsMatch ? "Passwords match" : "Passwords do not match"}
          </div>
        )}
        {password.confirm.length > 0 &&
          !Object.values(passwordValidation).every((v) => v) && (
            <div className="mt-2 flex items-center gap-2 text-sm text-amber-600">
              <X className="w-4 h-4" />
              Please complete new password requirements first
            </div>
          )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <SaveChangesBtn
          text={isSubmitting ? "Saving..." : "Save Changes"}
          onClick={handlePasswordChange}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
}
