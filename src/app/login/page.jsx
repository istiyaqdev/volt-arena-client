"use client";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Successfully logged in");
      router.push("/");
      router.refresh();
    }

    if (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
      return;
    }
  };
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center my-10 px-1">
      <div>
        <Card className="bg-[#0b0f19] border border-slate-800/80 shadow-2xl rounded-2xl p-6 md:p-9 text-white">
          <div className="text-left mb-6">
            <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
              Welcome Back
            </h1>
            <p className="text-slate-400">
              Sign in to book and manage facilities
            </p>
          </div>
          <Form
            className="flex sm:w-96 flex-col gap-4"
            render={(props) => <form {...props} data-custom="foo" />}
            onSubmit={onSubmit}
          >
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-xs font-bold text-slate-350 uppercase tracking-wider mb-1.5 block">
                Email
              </Label>
              <Input
                placeholder="Enter your email"
                className="bg-slate-950 border border-slate-850 text-white placeholder-slate-500 rounded-xl"
              />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="text-xs font-bold text-slate-350 uppercase tracking-wider mb-1.5 block">
                Password
              </Label>
              <InputGroup className="bg-slate-950 border border-slate-850 rounded-xl">
                <InputGroup.Input
                  className="w-full text-white placeholder-slate-500"
                  placeholder="Enter your password"
                  type={isVisible ? "text" : "password"}
                />
                <InputGroup.Suffix className="pr-0">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-white"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>

              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <div className="flex justify-center mt-2">
              <Button
                type="submit"
                className="w-full rounded-xl bg-[#ccff00] hover:bg-[#ccff00]/90 text-black font-extrabold uppercase tracking-widest py-3 transition-all shadow-[0_0_12px_rgba(204,255,0,0.3)]"
              >
                Log In
              </Button>
            </div>
          </Form>
          <div className="divider text-slate-400 h-0.5 my-6 text-xs uppercase tracking-wider">
            Or sign up with
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              onClick={handleGoogleSignIn}
              className="btn w-full bg-slate-905 hover:bg-slate-850 text-white border border-slate-800 rounded-xl py-3 flex items-center justify-center gap-2 font-semibold transition-all cursor-pointer"
            >
              <FcGoogle className="h-4 w-4" />
              Sign in with Google
            </button>
            <div className="flex gap-2 mt-2">
              <p className="text-sm text-slate-400">Don't have an account?</p>
              <Link
                href={"/signup"}
                className="text-[#ccff00] font-extrabold hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
