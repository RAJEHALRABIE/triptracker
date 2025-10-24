// simple mock server for local testing
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/auth/login', (req,res)=> {
  return res.json({ token: 'mock-token', expiresAt: new Date(Date.now()+3600*1000).toISOString() });
});

app.post('/trips/start', (req,res)=> {
  const body = req.body;
  return res.json({ status:'ok', tripId: body.tripId || 'T-'+Date.now(), serverTimestamp: new Date().toISOString() });
});

app.post('/trips/:tripId/end', (req,res)=> {
  const now = new Date().toISOString();
  return res.json({ status:'ok', tripId: req.params.tripId, savedAt: now });
});

app.post('/shifts/:shiftId/summary', (req,res)=> res.json({ status:'ok' }));
app.post('/goals/sync', (req,res)=> res.json({ results: (req.body || []).map(g=>({ dateKey:g.dateKey, status:'ok', serverUpdatedAt: new Date().toISOString() })) }));
app.get('/reports', (req,res)=> {
  return res.json({ shifts: [], trips: [], meta:{ total:0, page:1, size:50 } });
});
app.post('/reports/export', (req,res)=> {
  return res.status(202).json({ exportId: 'export-'+Date.now() });
});

const port = process.env.PORT || 3001;
app.listen(port, ()=> console.log('Mock server listening on', port));
