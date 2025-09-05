'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdPhoneIphone, MdBadge, MdVerifiedUser } from "react-icons/md";
import { getMyReservations } from "@/api/api";

type User = {
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  isPhoneVerified: boolean;
  role: string;
  id: number;
};

export default function ProfilePage() {
  const [tab, setTab] = useState<"info" | "reservations">("info");
  const [user, setUser] = useState<User | null>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [reservationsLoading, setReservationsLoading] = useState(false);
  const [reservationsError, setReservationsError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      router.replace("/login");
      return;
    }
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {
        setUser(null);
      }
    }
  }, [router]);

  useEffect(() => {
    if (tab === "reservations") {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) return;
      setReservationsLoading(true);
      setReservationsError("");
      getMyReservations(jwt)
        .then((data) => {
          setReservations(data);
        })
        .catch((err) => setReservationsError(err.message || "خطا در دریافت رزروها"))
        .finally(() => setReservationsLoading(false));
    }
  }, [tab]);

  return (
    <div className="max-w-2xl mx-auto m-10 p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center border-b mb-6">
        <div>
          <button
            className={`px-4 py-2 font-bold ${tab === "info" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
            onClick={() => setTab("info")}
          >
            اطلاعات من
          </button>
          <button
            className={`px-4 py-2 font-bold ${tab === "reservations" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
            onClick={() => setTab("reservations")}
          >
            رزروهای من
          </button>
        </div>
        <button
          className="text-red-500 font-bold px-4 py-2 rounded hover:bg-red-50 transition"
          onClick={() => {
            localStorage.removeItem("jwt");
            localStorage.removeItem("user");
            router.replace("/login");
          }}
        >
          خروج
        </button>
      </div>
      {tab === "info" && (
        <div>
          {user ? (
            <div className="bg-blue-50 rounded-xl shadow p-6 flex flex-col gap-4 max-w-md mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-200 text-blue-700 rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>
                <div>
                  <div className="text-lg font-bold">{user.firstName} {user.lastName}</div>
                  <div className="text-xs text-gray-500">{user.role === "User" ? "کاربر عادی" : user.role}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MdPhoneIphone className="text-blue-500 text-lg" />
                  <span>شماره موبایل:</span>
                  <span className="font-mono">{user.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdBadge className="text-blue-500 text-lg" />
                  <span>کد ملی:</span>
                  <span className="font-mono">{user.nationalId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdVerifiedUser className="text-blue-500 text-lg" />
                  <span>وضعیت تایید موبایل:</span>
                  <span className={user.isPhoneVerified ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {user.isPhoneVerified ? "تایید شده" : "تایید نشده"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-10 h-10 border-4 border-laurenBlue border-t-transparent rounded-full animate-spin mb-4"></div>
              <span className="text-laurenBlue font-bold">در حال بارگذاری اطلاعات...</span>
            </div>
          )}
        </div>
      )}
      {tab === "reservations" && (
        <div>
          {reservationsLoading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-8 h-8 border-4 border-laurenBlue border-t-transparent rounded-full animate-spin mb-4"></div>
              <span className="text-laurenBlue font-bold">در حال دریافت رزروها...</span>
            </div>
          ) : reservationsError ? (
            <div className="text-red-500">{reservationsError}</div>
          ) : (
            <>
              <h3 className="font-bold mb-2">رزروهای آینده</h3>
              {reservations.filter(r => new Date(r.reservationDate) > new Date()).length === 0 && (
                <div className="text-gray-400 text-sm mb-4">رزرو آینده‌ای وجود ندارد.</div>
              )}
              {reservations
                .filter(r => new Date(r.reservationDate) > new Date())
                .map(r => (
                  <div key={r.id} className="bg-blue-50 rounded p-3 mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <span className="font-bold">{r.specialtyName}</span>
                      <span className="mx-2 text-gray-500 text-xs">{new Date(r.reservationDate).toLocaleDateString("fa-IR")}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      وضعیت:{" "}
                      {r.status === 1
                        ? "در انتظار"
                        : r.status === 2
                        ? "تایید شده"
                        : r.status === 3
                        ? "لغو شده"
                        : r.status === 4
                        ? "انجام شده"
                        : r.status}
                    </div>
                  </div>
                ))}

              <hr className="my-4" />
              <h3 className="font-bold mb-2">رزروهای گذشته</h3>
              {reservations.filter(r => new Date(r.reservationDate) <= new Date()).length === 0 && (
                <div className="text-gray-400 text-sm mb-4">رزرو گذشته‌ای وجود ندارد.</div>
              )}
              {reservations
                .filter(r => new Date(r.reservationDate) <= new Date())
                .map(r => (
                  <div key={r.id} className="bg-gray-100 rounded p-3 mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <span className="font-bold">{r.specialtyName}</span>
                      <span className="mx-2 text-gray-500 text-xs">{new Date(r.reservationDate).toLocaleDateString("fa-IR")}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      وضعیت:{" "}
                      {r.status === 1
                        ? "در انتظار"
                        : r.status === 2
                        ? "تایید شده"
                        : r.status === 3
                        ? "لغو شده"
                        : r.status === 4
                        ? "انجام شده"
                        : r.status}
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}