//import firebaseAuth
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { authClasses } from "./authClasses";
import { useForm } from "react-hook-form";
// adds validation rules defined in Yup schema to form fields
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm } from "../../models/Form";
import { authFormSchema } from "../../models/Form";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/storeHooks";
import { login } from "../../features/authSlice";

const { button, hr, forgotPasswordButton } = authClasses;

const Auth = () => {
  // The argument passed must be either login or sign-up. with default login
  const [authType, setAuthType] = useState<"login" | "sign-up">("login");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const dispatch = useAppDispatch();

  const handleAuthType = () => {
    // if not logges in then sow sign-up.
    setAuthType((prev) => (prev === "login" ? "sign-up" : "login"));
  };

  const handleFormSubmit = async (data: AuthForm) => {
    console.log("Inside the  Handle Form submit ");
    const { email, password } = data;
    setErrorMessage(null);
    setLoading(true);
    if (authType === "sign-up") {
      try {
        setLoading(true);
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Checking out the user from firestore", user);
        // update user to firestore
        // create users collection and save email and userid
        await setDoc(doc(db, "users", user.uid), { email });
        setLoading(false);
        // dipatch to login action with some payload:;
        if (user && user.email)
          dispatch(
            login({
              email: user.email,
              id: user.uid,
              photoUrl: user.photoURL || null,
            })
          );
      } catch (error: any) {
        setLoading(false);
        const errorCode = error.code;
        setErrorMessage(errorCode);
      }
    } else {
      //Sign in  User.
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      if (user && user.email) {
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user.photoURL || null,
          })
        );
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: yupResolver(authFormSchema),
  });

  return (
    <div className="grid h-screen place-items-center px-4 text-sm font-medium">
      <div className="bg-red-300 w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
        {errorMessage && (
          <p className="bg-red-400 px-3 py-2 text-center rounded-md text-white">
            {errorMessage}
          </p>
        )}
        {/* Passing on custom form to submit handler */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-4 md:p-5 lg:p-6"
        >
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
                {...register("email")}
                type="email"
                placeholder="email@gmail.com"
                className="focus:border-purple-400 w-full rounded-md border border-slate-600 bg-gray-700  text-white p-2"
              />
              {errors.email ? (
                <span className="text-red-700">{errors.email.message}</span>
              ) : (
                <></>
              )}
            </div>
            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Input Password"
                className="focus:border-purple-400 w-full rounded-md border border-slate-600 bg-gray-700 text-white p-2"
              />

              {errors.password ? (
                <span className="text-red-700">{errors.password.message}</span>
              ) : (
                <></>
              )}
            </div>
            <div>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className="focus:border-purple-400 w-full rounded-md border border-slate-600 bg-gray-700 text-white p-2"
              />
              {errors.confirmPassword ? (
                <span className="text-red-700">
                  {errors.confirmPassword.message}
                </span>
              ) : (
                <></>
              )}
            </div>
            <button disabled={loading} className={button}>
              Sign {authType === "login" ? "in" : "up"} with email
            </button>
          </div>
          <div className="text-sm font-light py-4">
            {authType === "login" ? (
              <span className="text-sm">
                Dont have an account yet?
                <span
                  onClick={handleAuthType}
                  className="ml-6 font-bold hover:underline cursor-pointer"
                >
                  Sign Up
                </span>
              </span>
            ) : (
              <span>
                Already have an account ?{" "}
                <span
                  onClick={handleAuthType}
                  className="ml-6 font-bold hover:underline cursor-pointer"
                >
                  Sign in
                </span>
              </span>
            )}
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
