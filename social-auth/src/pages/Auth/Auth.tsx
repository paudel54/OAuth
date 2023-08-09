import { link } from "fs";
import { authClasses } from "./authClasses";
const { button, hr, forgotPasswordButton } = authClasses;

const Auth = () => {
  return (
    <div className="grid h-screen place-items-center px-4 text-sm font-medium">
      <div className="bg-red-300 w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
        <form className="p-4 md:p-5 lg:p-6">
          <div className="grid gap-y-3">
            <button type="button" className={button}>
              Google
            </button>
          </div>

          <div className="my-3 flex items-center px-3">
            <hr className={hr} />
            <span className="text-slate-500">or</span>
            <hr className={hr} />
          </div>

          <div className="grid gap-y-3">
            <div>
              <input
                type="email"
                placeholder="email@gmail.com"
                className="focus:border-purple-400 w-full rounded-md border border-slate-600 bg-gray-700  text-white p-2"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Input Password"
                className="focus:border-purple-400 w-full rounded-md border border-slate-600 bg-gray-700 text-white p-2"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="focus:border-purple-400 w-full rounded-md border border-slate-600 bg-gray-700 text-white p-2"
              />
            </div>
            <button className={button}>Sign in with email</button>
          </div>
          <div className="text-sm font-light py-4">
            <span className="text-sm">
              Dont have an account yet?
              <span className="ml-6 font-bold hover:underline cursor-pointer">
                Sign Up
              </span>
            </span>
          </div>

          <div className="my-3 flex items-center px-3">
            <hr className={hr} />
            <button type="button" className={forgotPasswordButton}>
              forgot password
            </button>
            <hr className={hr} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
