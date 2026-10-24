import React, { useState, useEffect, useCallback } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
const [phone, setPhone] = useState<Phone | null>(null);
const [error, setError] = useState<string | null>(null);
const load = useCallback(async () => {
// TODO 1: setError(null); setPhone(null);
setError(null);
setPhone(null);
// TODO 2: try { setPhone(await fetchPhone("1")) } catch (e) { setError(...) }
try {
  setPhone(await fetchPhone("1"));
} catch (e: any) {
  setError(e.message);
}
}, []);
// TODO 3: useEffect gọi load() khi màn hình mở lần đầu
useEffect(() => {
  load();
}, [load]);
// TODO 4: nếu có error → <ErrorBox message={error} onRetry={load} />
if (error) {
  return <ErrorBox message={error} onRetry={load} />;
}
// TODO 5: nếu chưa có phone → <Loading /> (vòng xoay ActivityIndicator + chữ "Đang tải...")
if (!phone) {
  return <Loading />;
}
// TODO 6: ngược lại → <SelectPhoneApp phone={phone} /> (dùng lại toàn bộ Bài 1)
return <SelectPhoneApp phone={phone} />;
}
