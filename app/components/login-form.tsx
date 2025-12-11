import {
  EmailInput,
  PasswordInput,
  PhoneNumber,
  CheckBox,
  GoogleBtn,
  FacebookBtn,
  LoginBtn,
} from "./ui/form-elements";

export function LoginForm() {
  return (
    <div className="w-full max-w-md space-y-6">
      <EmailInput />
      <PasswordInput />
      <PhoneNumber />
      <div className="flex items-center gap-2">
        <CheckBox />
        <span className="text-sm">Remember me</span>
      </div>
      <div className="space-y-3">
        <GoogleBtn />
        <FacebookBtn />
        <LoginBtn />
      </div>
    </div>
  );
}
    