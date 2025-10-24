import React from 'react';
import ReactDOM from 'react-dom';
import HeaderDates from './components/HeaderDates';
import StickyShiftBar from './components/StickyShiftBar';
import ValueModal from './components/ValueModal';
import './components/theme.css';

function App(){
  const shiftState = { active: true, shiftId: 'S123', status: 'جارٍ', tripsCount: 1, totalAmount: 120.5 };
  const tripState = { active: true, tripId: 'T1', startTimestamp: new Date().toISOString(), durationSeconds: 0, distanceMeters: 0 };
  return (
    <div>
      <HeaderDates />
      <StickyShiftBar shiftStateProp={shiftState} tripStateProp={tripState} />
      <main style={{padding:16}}>
        <h2>لوحة الشفت والرحلات</h2>
        {/* rest of UI */}
      </main>
      <ValueModal visible={false} onClose={()=>{}} onSave={async (v)=>{ console.log('save',v); }} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
