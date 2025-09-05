"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdPhoneIphone, MdBadge, MdVerifiedUser } from "react-icons/md";
import { cancelReservation, getMyReservations } from "@/api/api";

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

  const toPersianDigits = (time: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    // حذف ثانیه‌ها (فرض: زمان به فرمت HH:mm:ss یا HH:mm است)
    const shortTime = time.split(":").slice(0, 2).join(":"); // فقط ساعت و دقیقه
    return shortTime.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

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
      getMyReservations()
        .then((data) => {
          setReservations(data);
        })
        .catch((err) =>
          setReservationsError(err.message || "خطا در دریافت رزروها")
        )
        .finally(() => setReservationsLoading(false));
    }
  }, [tab]);

  const handleCancelReservation = async (reservationId: number) => {
    if (confirm("آیا مطمئن هستید که می‌خواهید این رزرو را لغو کنید؟")) {
      try {
        // Assuming there's an API function to cancel reservations
        // await cancelReservation(reservationId);
        cancelReservation({ reservationId })
          .then((data) => {
            console.log("cancelReservation", data);
            alert("رزرو با موفقیت لغو شد");
          })
          .catch((err) => console.log(err.message || "خطا در لغو رزرو"));
        setReservations(
          reservations.map((r) =>
            r.id === reservationId ? { ...r, status: 3 } : r
          )
        );
      } catch (err) {
        alert("خطا در لغو رزرو");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto m-10 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center border-b mb-6">
        <div>
          <button
            className={`px-4 py-2 font-bold ${
              tab === "info"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setTab("info")}
          >
            اطلاعات من
          </button>
          <button
            className={`px-4 py-2 font-bold ${
              tab === "reservations"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
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
                  <div className="text-lg font-bold">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user.role === "User" ? "کاربر عادی" : user.role}
                  </div>
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
                  <span
                    className={
                      user.isPhoneVerified
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {user.isPhoneVerified ? "تایید شده" : "تایید نشده"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-10 h-10 border-4 border-laurenBlue border-t-transparent rounded-full animate-spin mb-4"></div>
              <span className="text-laurenBlue font-bold">
                در حال بارگذاری اطلاعات...
              </span>
            </div>
          )}
        </div>
      )}
      {tab === "reservations" && (
        <div>
          {reservationsLoading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-8 h-8 border-4 border-laurenBlue border-t-transparent rounded-full animate-spin mb-4"></div>
              <span className="text-laurenBlue font-bold">
                در حال دریافت رزروها...
              </span>
            </div>
          ) : reservationsError ? (
            <div className="text-red-500">{reservationsError}</div>
          ) : (
            <>
              <h3 className="font-bold text-lg mb-4 text-blue-700">
                رزروهای آینده
              </h3>
              {reservations.filter(
                (r) => new Date(r.reservationDate) > new Date()
              ).length === 0 && (
                <div className="text-gray-400 text-sm mb-4 bg-gray-50 p-4 rounded-lg">
                  رزرو آینده‌ای وجود ندارد.
                </div>
              )}
              {reservations
                .filter((r) => new Date(r.reservationDate) > new Date())
                .map((r) => (
                  <div
                    key={r.id}
                    className="bg-blue-50 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-blue-800">
                        {r.specialtyName}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(r.reservationDate).toLocaleDateString(
                          "fa-IR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {toPersianDigits(r.endTime)} -{" "}
                        {toPersianDigits(r.startTime)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                          r.status === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : r.status === 2
                            ? "bg-green-100 text-green-800"
                            : r.status === 3
                            ? "bg-red-100 text-red-800"
                            : r.status === 4
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
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
                      </span>
                      {r.status !== 3 && r.status !== 4 && (
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
                          onClick={() => handleCancelReservation(r.id)}
                        >
                          لغو رزرو
                        </button>
                      )}
                    </div>
                  </div>
                ))}

              <hr className="my-6 border-gray-200" />
              <h3 className="font-bold text-lg mb-4 text-blue-700">
                رزروهای گذشته
              </h3>
              {reservations.filter(
                (r) => new Date(r.reservationDate) <= new Date()
              ).length === 0 && (
                <div className="text-gray-400 text-sm mb-4 bg-gray-50 p-4 rounded-lg">
                  رزرو گذشته‌ای وجود ندارد.
                </div>
              )}
              {reservations
                .filter((r) => new Date(r.reservationDate) <= new Date())
                .map((r) => (
                  <div
                    key={r.id}
                    className="bg-gray-100 rounded-lg p-4 mb-3 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">
                        {r.specialtyName}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(r.reservationDate).toLocaleDateString(
                          "fa-IR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        r.status === 1
                          ? "bg-yellow-100 text-yellow-800"
                          : r.status === 2
                          ? "bg-green-100 text-green-800"
                          : r.status === 3
                          ? "bg-red-100 text-red-800"
                          : r.status === 4
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
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
                    </span>
                  </div>
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
