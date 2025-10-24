import React, { useState, useRef, useEffect } from 'react';

export default function ValueModal({ visible, onClose, onSave }: { visible: boolean; onClose: ()=>void; onSave: (value:number)=>Promise<void> }) {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(()=> {
    if(visible && ref.current) { ref.current.focus(); ref.current.scrollIntoView({ block: 'center' }); }
  },[visible]);
  function validate(v: string) {
    if(!v) return true;
    const ok = /^\d+(\.\d{1,2})?$/.test(v);
    return ok;
  }
  async function handleSave(){
    if(!validate(value)){ setError('قيمة غير صالحة. مثال صحيح 10 أو 10.20'); return; }
    const num = Number(value || 0);
    if(num === 0){
      const confirmed = confirm('القيمة فارغة أو صفر. هل تريد المتابعة؟');
      if(!confirmed) return;
    }
    setError(null);
    try{
      await onSave(num);
      onClose();
    }catch(e){
      setError('فشل تسجيل النهاية. حاول مرة أخرى');
    }
  }
  if(!visible) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal-card">
        <h3>قيمة الرحلة</h3>
        <input ref={ref} inputMode="decimal" pattern="\\d+(\\.\\d{1,2})?" placeholder="00.00" value={value} onChange={e=>setValue(e.target.value)} />
        {error && <div className="error">{error}</div>}
        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSave}>حفظ</button>
          <button onClick={onClose}>إلغاء</button>
        </div>
      </div>
    </div>
  );
}
