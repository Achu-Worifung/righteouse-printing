export function CheckBox() {
  return (
    <>
      <input
        type="checkbox"
        className="checkbox validator"
        required
        title="Required"
      />
      <p className="validator-hint">Required</p>
    </>
  );
}

export function EmailInput() {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email
      </label>
      <input
        className="input validator"
        type="email"
        required
        placeholder="mail@site.com"
      />
      <div className="validator-hint">Enter valid email address</div>
    </div>
  );
}

export function PasswordInput() {
  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <input
        type="password"
        className="input validator"
        required
        placeholder="Password"
        minLength={8}
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
      />
      <p className="validator-hint">
        Must be more than 8 characters, including
        <br />
        At least one number
        <br />
        At least one lowercase letter
        <br />
        At least one uppercase letter
      </p>
    </div>
  );
}

export function PhoneNumber() {
  return (
    <div>
      <label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-700"
      >
        Phone Number
      </label>
      <input
        type="tel"
        className="input validator tabular-nums"
        required
        placeholder="Phone"
        pattern="[0-9]*"
        minLength={10}
        maxLength={10}
        title="Must be 10 digits"
      />
      <p className="validator-hint">Must be 10 digits</p>
    </div>
  );
}

export function GoogleBtn() {
  return (
    <button className="btn bg-offwhite text-black border-[#e5e5e5]">
      <svg
        aria-label="Google logo"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g>
          <path d="m0 0H512V512H0" fill="#fff"></path>
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          ></path>
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          ></path>
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          ></path>
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          ></path>
        </g>
      </svg>
      Login with Google
    </button>
  );
}

export function FacebookBtn() {
  return (
    <button className="btn bg-[#1A77F2] text-white border-[#005fd8]">
      <svg
        aria-label="Facebook logo"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
      >
        <path
          fill="white"
          d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
        ></path>
      </svg>
      Login with Facebook
    </button>
  );
}

export function LoginBtn() {
  return (
    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      Sign in
    </button>
  );
}
