import React, { useEffect, useState } from 'react';

type DatesModel = {
  gregorian: { weekday: string; monthName: string; day: number; year: number; monthIndex: number; formatted: string };
  hijri: { weekdayAr: string; monthNameAr: string; dayHijri: number; yearHijri: number; monthIndexHijri: number; formatted: string };
};

function getDatesNow(): DatesModel {
  const now = new Date();
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(now);
  const day = now.getDate();
  const year = now.getFullYear();
  const monthIndex = now.getMonth() + 1;
  const gregFormatted = `${weekday}, ${monthName} ${day}, ${year} <${monthIndex}>`;

  let hijObj = { weekdayAr: '', monthNameAr: '', dayHijri: 0, yearHijri: 0, monthIndexHijri: 0, formatted: '' };
  try {
    const hijFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' });
    const parts = hijFormatter.formatToParts(now);
    const dayHijri = parts.find(p => p.type === 'day')?.value ?? '';
    const monthNameAr = parts.find(p => p.type === 'month')?.value ?? '';
    const yearHijri = parts.find(p => p.type === 'year')?.value ?? '';
    const monthIndexHijri = 0;
    hijObj = { weekdayAr: parts.find(p=>p.type==='weekday')?.value ?? '', monthNameAr, dayHijri: Number(dayHijri), yearHijri: Number(yearHijri), monthIndexHijri, formatted: `${parts.find(p=>p.type==='weekday')?.value ?? ''}، ${dayHijri}/${monthNameAr}/${yearHijri} <${monthIndexHijri}>` };
  } catch(e) {
    hijObj = { weekdayAr:'الجمعة', monthNameAr:'جمادى الأولى', dayHijri:3, yearHijri:1447, monthIndexHijri:5, formatted:'الجمعة، 03/جمادى الأولى/1447 <5>' };
  }

  return { gregorian: { weekday, monthName, day, year, monthIndex, formatted: gregFormatted }, hijri: { weekdayAr: hijObj.weekdayAr, monthNameAr: hijObj.monthNameAr, dayHijri: hijObj.dayHijri, yearHijri: hijObj.yearHijri, monthIndexHijri: hijObj.monthIndexHijri, formatted: hijObj.formatted } };
}

export default function HeaderDates() {
  const [dates, setDates] = useState<DatesModel>(getDatesNow());
  useEffect(() => {
    const t = setInterval(() => {
      setDates(getDatesNow());
    }, 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <header className="header">
      <div className="date-block">
        <div className="date-greg" dir="ltr">{dates.gregorian.formatted}</div>
        <div className="date-hijri">{dates.hijri.formatted}</div>
      </div>
      <div className="app-title">متتبع الرحلات</div>
    </header>
  );
}
