"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [tab, setTab] = useState<"register" | "login">("register");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState<"form" | "code">("form");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        router.replace("/profile");
      }
    }
  }, [router]);

  // تبدیل اعداد فارسی و عربی به انگلیسی
  const toEnglishDigits = (str: string) => {
    const persianNumbers = [
      /[\u06F0-\u06F9]/g,
      (c) => String.fromCharCode(c.charCodeAt(0) - 1728),
    ];
    const arabicNumbers = [
      /[\u0660-\u0669]/g,
      (c) => String.fromCharCode(c.charCodeAt(0) - 1584),
    ];
    return str
      .replace(persianNumbers[0], persianNumbers[1])
      .replace(arabicNumbers[0], arabicNumbers[1])
      .replace(/[^0-9]/g, "");
  };

  // ثبت نام
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const englishPhone = toEnglishDigits(phone);
    const englishNationalId = toEnglishDigits(nationalId);

    if (!firstName || !lastName || !englishNationalId || !englishPhone) {
      setError("لطفا همه فیلدها را کامل کنید.");
      return;
    }
    if (!/^09\d{9}$/.test(englishPhone)) {
      setError("شماره تلفن معتبر وارد کنید (مثال: 09123456789)");
      return;
    }
    if (!/^\d{10}$/.test(englishNationalId)) {
      setError("کد ملی معتبر وارد کنید (۱۰ رقم)");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://dentis.liara.run/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          nationalId: englishNationalId,
          phoneNumber: englishPhone,
        }),
      });
      const text = await res.text();
      let phoneNumber = "";
      let data = null;
      try {
        data = JSON.parse(text);
        if (!res.ok) {
          setError(data.message || "ثبت‌نام با خطا مواجه شد.");
          setLoading(false);
          return;
        }
        if (typeof data.phoneNumber === "string") {
          phoneNumber = data.phoneNumber;
        }
      } catch {
        if (res.status === 200 && /^09\d{9}$/.test(text.trim())) {
          phoneNumber = text.trim();
        } else {
          setError("پاسخ سرور معتبر نیست.");
          setLoading(false);
          return;
        }
      }
      if (res.status === 200 && phoneNumber) {
        const res2 = await fetch(
          "https://dentis.liara.run/api/Auth/send-verification",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phoneNumber }),
          }
        );
        const data2 = await res2.json();
        if (!res2.ok || data2.message !== "کد تأیید ارسال شد") {
          throw new Error(data2.message || "ارسال کد با خطا مواجه شد.");
        }
        setStep("code");
      } else if (!res.ok) {
        setError((data && data.message) || "ثبت‌نام با خطا مواجه شد.");
      } else {
        setError("ثبت‌نام با خطا مواجه شد.");
      }
    } catch (err: any) {
      setError(err.message || "خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  // ورود (فقط شماره موبایل)
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const englishPhone = toEnglishDigits(phone);
    if (!/^09\d{9}$/.test(englishPhone)) {
      setError("شماره تلفن معتبر وارد کنید (مثال: 09123456789)");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://dentis.liara.run/api/Auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: englishPhone }),
      });
      const data = await res.json();
      if (!res.ok || data.message !== "کد تأیید ارسال شد") {
        throw new Error(data.message || "ارسال کد با خطا مواجه شد.");
      }
      setStep("code");
    } catch (err: any) {
      setError(err.message || "خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  // تایید کد (برای هر دو تب)
  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const englishCode = toEnglishDigits(code);
    const englishPhone = toEnglishDigits(phone);
    if (!/^\d{6}$/.test(englishCode)) {
      setCodeError("کد ۶ رقمی معتبر وارد کنید");
      return;
    }
    setCodeError("");
    setLoading(true);
    try {
      const res = await fetch(
        "https://dentis.liara.run/api/Auth/verify-phone",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: englishPhone,
            verificationCode: englishCode,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || "کد وارد شده صحیح نیست یا منقضی شده است."
        );
      }
      // ذخیره JWT
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      router.push("/profile");
    } catch (err: any) {
      setCodeError(err.message || "خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  // ریست فرم هنگام تغییر تب
  useEffect(() => {
    setError("");
    setCodeError("");
    setStep("form");
    setCode("");
    setFirstName("");
    setLastName("");
    setNationalId("");
    setPhone("");
  }, [tab]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-20">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 rounded-t-xl font-bold transition ${
              tab === "register"
                ? "bg-laurenBlue text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setTab("register")}
            disabled={tab === "register"}
          >
            ثبت‌نام
          </button>
          <button
            className={`flex-1 py-2 rounded-t-xl font-bold transition ${
              tab === "login"
                ? "bg-laurenBlue text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setTab("login")}
            disabled={tab === "login"}
          >
            ورود
          </button>
        </div>

        {/* فرم ثبت‌نام */}
        {tab === "register" && step === "form" && (
          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span>نام:</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border rounded-lg p-2 text-right"
                required
                disabled={loading}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>نام خانوادگی:</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border rounded-lg p-2 text-right"
                required
                disabled={loading}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>کد ملی:</span>
              <input
                type="text"
                value={nationalId}
                onChange={(e) => {
                  const value = toEnglishDigits(e.target.value);
                  setNationalId(value);
                }}
                className="border rounded-lg p-2 text-right"
                placeholder="۱۰ رقم"
                maxLength={10}
                required
                disabled={loading}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>شماره موبایل:</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const value = toEnglishDigits(e.target.value);
                  setPhone(value);
                }}
                className="border rounded-lg p-2 text-right"
                placeholder="مثال: 09123456789"
                maxLength={11}
                required
                disabled={loading}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </label>
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button
              type="submit"
              className="bg-laurenBlue text-white rounded-lg py-2 font-bold hover:bg-laurenBlue/80 transition"
              disabled={loading}
            >
              {loading ? "در حال ارسال..." : "ادامه"}
            </button>
          </form>
        )}

        {/* فرم ورود */}
        {tab === "login" && step === "form" && (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span>شماره موبایل:</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const value = toEnglishDigits(e.target.value);
                  setPhone(value);
                }}
                className="border rounded-lg p-2 text-right"
                placeholder="مثال: 09123456789"
                maxLength={11}
                required
                disabled={loading}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </label>
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button
              type="submit"
              className="bg-laurenBlue text-white rounded-lg py-2 font-bold hover:bg-laurenBlue/80 transition"
              disabled={loading}
            >
              {loading ? "در حال ارسال..." : "ادامه"}
            </button>
          </form>
        )}

        {/* فرم کد تایید برای هر دو تب */}
        {step === "code" && (
          <form onSubmit={handleCodeSubmit} className="flex flex-col gap-4">
            <div className="text-center text-gray-600 text-sm mb-2">
              کد ۶ رقمی ارسال شده به <span className="font-bold">{phone}</span> را وارد کنید.
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                const value = toEnglishDigits(e.target.value);
                setCode(value);
              }}
              className="border rounded-lg p-2 text-center tracking-widest text-lg"
              placeholder="------"
              maxLength={6}
              required
              inputMode="numeric"
              disabled={loading}
            />
            {codeError && (
              <span className="text-red-500 text-sm">{codeError}</span>
            )}
            <button
              type="submit"
              className="bg-laurenBlue text-white rounded-lg py-2 font-bold hover:bg-laurenBlue/80 transition"
              disabled={loading}
            >
              {loading ? "در حال بررسی..." : "تایید"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
