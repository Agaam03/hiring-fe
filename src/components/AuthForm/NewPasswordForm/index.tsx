"use client";
import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormError from "../../form-error";
import FormSuccess from "../../form-success";
import Link from "next/link";
import { NewPasswordSchema } from "@/schemas/index";
import Logo from "@/components/LogoNav";
import { newPass } from "@/actions/newPass";

export default function NewPasswordForm({ oobCode }: { oobCode: string }) {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { password: "", oobCode },
  });

  const handleSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      newPass({ password: values.password, oobCode }).then((response: any) => {
        setError(response.error);
        setSuccess(response.success);
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/* Logo */}
      <div className="w-full max-w-[500px] flex items-center justify-start">
        <Logo />
      </div>

      <div className="bg-white w-full max-w-[500px] shadow-lg p-8 space-y-6">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Bergabung dengn Rakamin
          </h1>
          <p className="text-gray-500 text-sm">
            Sudah punya akun?{" "}
            <Link href={"/login"} className="text-primary-green font-medium">
              Masuk
            </Link>
          </p>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...form.register("password")}
                disabled={isPending}
                className="w-full px-3 py-2 bg-white border border-primary-green rounded-md text-black placeholder-gray focus:outline-none focus:ring-1 focus:ring-primary-green hover:ring-primary-green hover:ring-1 transition text-sm"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition duration-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-secondary-yellow hover:bg-secondary-yellow-hover text-neutral-800 py-2 px-3 rounded-md transition text-md font-semibold disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Sent..." : "Set new password"}
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
  );
}
