import React, { useEffect, useState } from 'react';

type ShiftState = {
  active: boolean;
  shiftId?: string;
  status?: string;
  startTimestamp?: string;
  tripsCount?: number;
  totalAmount?: number;
  totalDurationSeconds?: number;
};

type TripState = {
  active: boolean;
  tripId?: string;
  startTimestamp?: string;
  durationSeconds?: number;
  distanceMeters?: number;
};

function formatHMS(seconds: number) {
  if (!seconds || seconds < 0) return '00:00:00';
  const h = Math.floor(seconds / 3600).toString().padStart(2,'0');
  const m = Math.floor((seconds % 3600)/60).toString().padStart(2,'0');
  const s = Math.floor(seconds % 60).toString().padStart(2,'0');
  return `${h}:${m}:${s}`;
}
function formatDistanceMeters(m: number){
  if(!m) return '00.00.00';
  const km = (m/1000).toFixed(2);
  return km.replace('.',':'); // placeholder to match format 00.00.00 adjust per desired.
}

export default function StickyShiftBar({ shiftStateProp, tripStateProp }: { shiftStateProp: ShiftState; tripStateProp: TripState }) {
  const [visible, setVisible] = useState(false);
  const [tripElapsed, setTripElapsed] = useState(0);
  useEffect(()=> {
    setVisible(!!shiftStateProp?.active);
  },[shiftStateProp]);

  useEffect(()=> {
    let timer: number | undefined;
    if(tripStateProp?.active && tripStateProp?.startTimestamp) {
      const start = new Date(tripStateProp.startTimestamp).getTime();
      const update = ()=> setTripElapsed(Math.floor((Date.now() - start)/1000));
      update();
      timer = window.setInterval(update, 1000);
    } else {
      setTripElapsed(tripStateProp?.durationSeconds ?? 0);
    }
    return ()=> { if(timer) clearInterval(timer); };
  }, [tripStateProp]);

  if(!visible) return null;
  return (
    <div className={`sticky-shift visible`} role="region" aria-label="شريط الشفت الحالي">
      <div className="shift-meta">
        <div><strong>شفت رقم</strong> {shiftStateProp.shiftId}</div>
        <div><small>{shiftStateProp.status}</small></div>
        <div><small>الرحلات: {shiftStateProp.tripsCount ?? 0}</small></div>
      </div>
      <div className="trip-counters">
        <div>الزمن: <span className="trip-timer" aria-live="polite">{formatHMS(tripElapsed)}</span></div>
        <div>المسافة: <span className="trip-distance" aria-live="polite">{formatDistanceMeters(tripStateProp.distanceMeters ?? 0)}</span></div>
      </div>
      <div className="shift-amount">
        <div>المجموع: {shiftStateProp.totalAmount?.toFixed(2) ?? '00.00'}</div>
      </div>
    </div>
  );
}
