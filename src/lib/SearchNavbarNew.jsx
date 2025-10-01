import React, { useEffect, useRef, useState } from "react";

// DebouncedWordSender
// - Ketik karakter di input
// - Jika tidak ada aktivitas selama 1.5 detik, teks saat ini dianggap sebagai satu "kata" dan dikirim
// - Daftar kata terkirim tampil di bawah
// - Tombol Reset untuk mengosongkan semuanya

export default function SearchNavbarNew() {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState([]); // list of words sent
  const timerRef = useRef(null);
  const DELAY = 1500; // 1.5 detik

  const scheduleSend = (text) => {
    // bersihkan timer sebelumnya agar selalu menunggu 1.5s setelah pengetikan terakhir
    if (timerRef.current) clearTimeout(timerRef.current);

    // jika kosong, tidak perlu jadwalkan
    if (!text || !text.trim()) return;

    timerRef.current = setTimeout(() => {
      send(text);
    }, DELAY);
  };

  const send = (text) => {
    const word = (text || "").trim();
    if (!word) return;
    setSent((prev) => [...prev, word]);
    setValue(""); // kosongkan input setelah terkirim
  };

  const onChange = (e) => {
    const next = e.target.value;
    setValue(next);
    scheduleSend(next);
  };

  // Opsional: kirim segera saat menekan Enter
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (timerRef.current) clearTimeout(timerRef.current);
      send(value);
    }
  };

  // bersihkan timer saat komponen unmount
  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, []);

  const resetAll = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setValue("");
    setSent([]);
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-gray-50 p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">Debounced Word Sender (1.5s)</h1>
          <p className="text-sm text-gray-600">
            Ketik karakter di input. Jika kamu berhenti selama <b>1.5 detik</b>,
            teks yang ada akan dianggap sebagai satu kata dan otomatis terkirim.
            Tekan <kbd className="px-1 py-0.5 rounded bg-gray-100 border">Enter</kbd> untuk mengirim langsung.
          </p>
        </header>

        <div className="space-y-3">
          <label htmlFor="word-input" className="text-sm font-medium">Ketik kata</label>
          <input
            id="word-input"
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="contoh: halo"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">Timeout: 1500 ms</span>
            <button
              onClick={resetAll}
              className="ml-auto px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm"
            >Reset</button>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Kata terkirim</h2>
          {sent.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada.</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {sent.map((w, i) => (
                <li key={i} className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-sm">
                  {w}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}