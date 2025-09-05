"use client";
import { getSpecialties, createReservation, getAvailableDays } from "@/api/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

type Specialty = {
  id: number;
  name: string;
  description?: string;
  hasInstallments?: boolean;
};

export default function NewReservePage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [specialtyId, setSpecialtyId] = useState("");
  const [reservationDate, setReservationDate] = useState<any>(null);
  const [startTime, setStartTime] = useState(""); // "HH:mm"
  const [endTime, setEndTime] = useState(""); // "HH:mm"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [availableTimes, setAvailableTimes] = useState<
    { startTime: string; endTime: string; isAvailable: boolean }[]
  >([]);
  const [fetchingTimes, setFetchingTimes] = useState(false);
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [fetchingDays, setFetchingDays] = useState(false);
  const [availableTimesPerDay, setAvailableTimesPerDay] = useState<{
    [date: string]: {
      startTime: string;
      endTime: string;
      isAvailable: boolean;
    }[];
  }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await getSpecialties();
        setSpecialties(data);
      } catch (err) {
        setSpecialties([]);
      }
    };
    fetchSpecialties();
  }, []);

  useEffect(() => {
    if (!specialtyId) {
      setAvailableDays([]);
      setAvailableTimesPerDay({});
      return;
    }
    setFetchingDays(true);
    getAvailableDays({ specialtyId })
      .then((days) => {
        setAvailableDays(days);
        // Fetch times for each day
        const timesPromises = days.map((date) =>
          fetch(
            `https://dentis.liara.run/api/reservations/available-times?date=${date}&specialtyId=${specialtyId}`
          ).then((res) => res.json())
        );
        Promise.all(timesPromises).then((timesArray) => {
          const timesPerDay = days.reduce((acc, date, index) => {
            acc[date] = timesArray[index];
            return acc;
          }, {} as { [date: string]: { startTime: string; endTime: string; isAvailable: boolean }[] });
          setAvailableTimesPerDay(timesPerDay);
        });
      })
      .finally(() => setFetchingDays(false));
  }, [specialtyId]);

  useEffect(() => {
    if (!specialtyId || !reservationDate) {
      setAvailableTimes([]);
      return;
    }
    const dateStr = reservationDate.toDate().toISOString().slice(0, 10);
    setAvailableTimes(availableTimesPerDay[dateStr] || []);
  }, [specialtyId, reservationDate, availableTimesPerDay]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const jwt =
      typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
    if (!jwt) {
      setError("برای ثبت رزرو باید وارد شوید.");
      setLoading(false);
      router.push("/login");
      return;
    }

    try {
      const [startHour, startMinute] = startTime.split(":");
      const [endHour, endMinute] = endTime.split(":");

      const formattedReservationDate = reservationDate
        ? new Date(reservationDate.toDate().toISOString())
        : new Date();

      await createReservation({
        specialtyId: Number(specialtyId),
        reservationDate: formattedReservationDate.toISOString(),
        startTime: `${startHour}:${startMinute}`,
        endTime: `${endHour}:${endMinute}`,
      });
      setSuccess("رزرو با موفقیت ثبت شد!");
    } catch (err: any) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  // فیلتر کردن تاریخ‌های قابل انتخاب در DatePicker
  const isDayAvailable = (dateObj: any) => {
    const dateStr = dateObj?.toDate?.().toISOString().slice(0, 10);
    return availableDays.includes(dateStr);
  };

  const toPersianNumbers = (num: string) => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (match) => persianNumbers[parseInt(match)]);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow p-8">
      <h2 className="text-xl font-bold mb-6 text-center">ثبت رزرو جدید</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span>تخصص:</span>
          <select
            value={specialtyId}
            onChange={(e) => setSpecialtyId(e.target.value)}
            className="border rounded-lg p-2"
            required
          >
            <option value="">انتخاب کنید...</option>
            {specialties.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} {s.description ? `- ${s.description}` : ""}{" "}
                {s.hasInstallments ? " (اقساطی)" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span>تاریخ رزرو (شمسی):</span>
          {fetchingDays ? (
            <div className="text-blue-500 text-sm">
              در حال دریافت روزهای آزاد...
            </div>
          ) : (
            <DatePicker
              value={reservationDate}
              onChange={setReservationDate}
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              calendarPosition="bottom-right"
              inputClass="border rounded-lg p-2 w-full"
              editable={false}
              render={<input className="border rounded-lg p-2 w-full" />}
              mapDays={({ date }) => {
                const dateStr = date?.toDate?.().toISOString().slice(0, 10);
                if (!availableDays.includes(dateStr)) {
                  return {
                    disabled: true,
                    style: { color: "#ccc", background: "#f5f5f5" },
                  };
                }
              }}
            />
          )}
        </label>
        {fetchingTimes && (
          <div className="text-blue-500 text-sm">
            در حال دریافت ساعات خالی...
          </div>
        )}
        {!fetchingDays && availableTimes.length > 0 && (
          <label className="flex flex-col gap-1">
            <span>انتخاب ساعت:</span>
            <select
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                const [h, m] = e.target.value.split(":");
                const endH = String(Number(h) + 1).padStart(2, "0");
                setEndTime(`${endH}:${m}`);
              }}
              className="border rounded-lg p-2 text-right"
              required
            >
              <option value="">انتخاب کنید...</option>
              {availableTimes.map((t, index) => (
                <option key={`${t.startTime}-${index}`} value={t.startTime}>
                  {toPersianNumbers(t.endTime)} -{" "}
                  {toPersianNumbers(t.startTime)}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-500 text-right">
              ساعت پایان به صورت خودکار یک ساعت بعد از شروع انتخاب می‌شود.
            </span>
          </label>
        )}
        {!fetchingTimes &&
          availableTimes.length === 0 &&
          specialtyId &&
          reservationDate && (
            <div className="text-red-500 text-sm">
              در این روز تایم خالی وجود ندارد.
            </div>
          )}
        {error && <span className="text-red-500 text-sm">{error}</span>}
        {success && <span className="text-green-600 text-sm">{success}</span>}
        <button
          type="submit"
          className="bg-laurenBlue text-white rounded-lg py-2 font-bold hover:bg-laurenBlue/80 transition"
          disabled={loading || !startTime}
        >
          {loading ? "در حال ثبت..." : "ثبت رزرو"}
        </button>
      </form>
    </div>
  );
}
