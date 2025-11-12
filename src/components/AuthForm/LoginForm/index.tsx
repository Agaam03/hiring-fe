"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { LoginSchema } from "@/schemas";
import { googleLogin } from "@/actions/googleLogin";
import { login } from "@/actions/login";
import { sendVerifLoginLink } from "@/actions/sendVerifLoginLink";
import LogoLogin from "@/components/LogoLogin";
const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [withPass, setWithPass] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (withPass) {
        const res = await login({
          email: data.email,
          password: data.password || "",
        });
        if (res.error) return setError(res.error);
        if (res.success) {
          setSuccess(res.success);
          setTimeout(() => router.push("/"), 1000);
        }
      } else {
        const res = await sendVerifLoginLink(data.email);

        if (res.error) {
          setError(res.error);
        } else if (res.success) {
          setSuccess(
            "Link verifikasi berhasil dikirim! Silakan cek email kamu untuk login."
          );
        }
      }
    } catch (err: any) {
      console.error(err);
      setError("Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    const res = await googleLogin();
    setLoading(false);

    if (res.error) return setError(res.error);
    if (res.success) {
      setSuccess(res.success);
      setTimeout(() => router.push("/"), 1000);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        {/* Logo */}
        <div className="w-full max-w-[500px] flex items-center justify-start">
          <LogoLogin />
        </div>

        {/* Login Card */}
        <div className="bg-white w-full max-w-[500px] shadow-lg p-8 space-y-6">
          {/* Title */}
          <div className="text-left">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Masuk Ke Rakamin
            </h1>
            <p className="text-gray-500 text-sm">
              Belum punya akun?{" "}
              <Link
                href={"/register"}
                className="text-primary-green font-medium"
              >
                Daftar menggunakan email
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Email */}
            <div>
              <p className="text-xs">Alamat email</p>
              <input
                type="email"
                {...form.register("email")}
                disabled={loading}
                className="w-full px-3 py-2 bg-white border border-primary-green rounded-md text-black placeholder-gray focus:outline-none focus:ring-1 focus:ring-primary-green hover:ring-primary-green hover:ring-1 transition text-sm"
                placeholder="name@example.com"
                autoComplete="email"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            {withPass && (
              <div className="relative">
                <p className="text-xs">Kata sandi</p>
                <input
                  type={showPassword ? "text" : "password"}
                  {...form.register("password")}
                  disabled={loading}
                  className="w-full px-3 py-2 bg-white border border-primary-green rounded-md text-black placeholder-gray focus:outline-none focus:ring-1 focus:ring-primary-green hover:ring-primary-green hover:ring-1 transition text-sm"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 mt-4.5 transform -translate-y-1/2 text-gray-500 hover:text-gray-700  cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {form.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
            )}

            {/* Forgot Password */}
            {withPass && (
              <div className="text-right">
                <Link
                  href="/reset"
                  className="text-primary-green hover:text-primary-hover text-xs"
                >
                  Lupa kata sandi?
                </Link>
              </div>
            )}

            {/* Feedback */}
            <FormError message={error} />
            <FormSuccess message={success} />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary-yellow hover:bg-secondary-yellow-hover text-neutral-800 py-2 px-3 rounded-md transition text-md font-semibold disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Loading..." : withPass ? "Masuk" : "Kirim Link Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 text-xs">or</span>
            </div>
          </div>

          {/* Toggle Login Mode */}
          <button
            onClick={() => setWithPass(!withPass)}
            className="w-full bg-white hover:bg-gray-100 py-2 px-4 rounded-md flex items-center justify-center border border-gray-300 shadow-sm transition text-sm font-medium cursor-pointer"
          >
            <Mail size={19} />
            {withPass ? (
              <span className="text-gray-700 ml-2">
                Kirim link login melalui email
              </span>
            ) : (
              <span className="text-gray-700 ml-2">
                Masuk dengan kata sandi
              </span>
            )}
          </button>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-100 py-2 px-4 rounded-md flex items-center justify-center border border-gray-300 shadow-sm transition text-sm font-medium -mt-2 cursor-pointer"
          >
            <FcGoogle className="text-xl mr-2" />
            <span className="text-gray-700">Masuk dengan Google</span>
          </button>

          {/* Terms */}
          <div className="text-center mt-4">
            <p className="text-gray-400 text-xs">
              Dengan melanjutkan, kamu menyetujui{" "}
              <Link
                href="/terms"
                className="text-gray-500 hover:text-gray-700 underline"
              >
                Ketentuan Layanan
              </Link>{" "}
              dan{" "}
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-gray-700 underline"
              >
                Kebijakan Privasi
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
