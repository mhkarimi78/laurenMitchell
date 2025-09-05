const baseUrl = "https://dentis.liara.run/api";

// گرفتن لیست تخصص‌ها
export async function getSpecialties() {
  const res = await fetch(`${baseUrl}/Specialties`);
  const data = await res.json();
  console.log("getSpecialties response:", data, res);
  if (!res.ok) throw new Error("خطا در دریافت تخصص‌ها");
  return data;
}

// ثبت رزرو جدید
export async function createReservation({
  specialtyId,
  reservationDate,
  startTime,
  endTime,
}: {
  specialtyId: number;
  reservationDate: string;
  startTime: string;
  endTime: string;
}) {
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  if (!jwt) throw new Error("برای ثبت رزرو باید وارد شوید.");

  const res = await fetch(`${baseUrl}/Reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      specialtyId,
      reservationDate,
      startTime,
      endTime,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "ثبت رزرو با خطا مواجه شد.");
  }
  const data = await res.json();
  console.log("createReservation response:", data, res);
  return data;
}

export async function cancelReservation({
  reservationId,
}: {
  reservationId: number;
}) {
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  if (!jwt) throw new Error("برای دریافت رزروها باید وارد شوید.");

  const response = await fetch(`${baseUrl}/Reservations/${reservationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to cancel reservation: ${response.statusText}`);
  }

  return response.json(); // یا اگر API چیزی برنمی‌گرداند، می‌توانید این خط را حذف کنید
}

// گرفتن رزروهای کاربر
export async function getMyReservations() {
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  if (!jwt) throw new Error("برای دریافت رزروها باید وارد شوید.");

  const res = await fetch(`${baseUrl}/Reservations/MyReserves`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
    },
  });
  const data = await res.json();
  console.log("getMyReservations response:", data, res);
  if (!res.ok) throw new Error("خطا در دریافت رزروها");
  return data;
}

// ثبت نام
export async function registerUser({
  firstName,
  lastName,
  nationalId,
  phoneNumber,
}: {
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
}) {
  const res = await fetch(`${baseUrl}/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, nationalId, phoneNumber }),
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  console.log("registerUser response:", data, res);
  if (!res.ok) throw new Error(data.message || "ثبت‌نام با خطا مواجه شد.");
  return data;
}

// ارسال کد تایید
export async function sendVerification(phoneNumber: string) {
  const res = await fetch(`${baseUrl}/Auth/send-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber }),
  });
  const data = await res.json();
  console.log("sendVerification response:", data, res);
  if (!res.ok || data.message !== "کد تأیید ارسال شد") {
    throw new Error(data.message || "ارسال کد با خطا مواجه شد.");
  }
  return data;
}

// تایید کد و دریافت JWT
export async function verifyPhone({
  phoneNumber,
  verificationCode,
}: {
  phoneNumber: string;
  verificationCode: string;
}) {
  const res = await fetch(`${baseUrl}/Auth/verify-phone`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber, verificationCode }),
  });
  const data = await res.json();
  console.log("verifyPhone response:", data, res);
  if (!res.ok)
    throw new Error(data.message || "کد وارد شده صحیح نیست یا منقضی شده است.");
  return data;
}

// گرفتن روزهای قابل دسترس
export async function getAvailableDays({
  specialtyId,
}: {
  specialtyId: string | number;
}) {
  const today = new Date();
  const days: string[] = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    // eslint-disable-next-line no-await-in-loop
    const res = await fetch(
      `${baseUrl}/reservations/available-times?date=${dateStr}&specialtyId=${specialtyId}`
    );
    const data = await res.json();
    console.log(`getAvailableDays [${dateStr}] response:`, data, res);
    if (Array.isArray(data) && data.length > 0) {
      days.push(dateStr);
    }
  }
  console.log("getAvailableDays result days:", days);
  return days; // آرایه‌ای از YYYY-MM-DD
}
