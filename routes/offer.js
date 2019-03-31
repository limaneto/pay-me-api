export default (app) => {
  app.post('/api/offer', (req, res) => { res.send('It hit post offer\n'); });
  app.get('/api/offers', (req, res) => { res.send('It hit get offers.\n'); });
  app.put('/api/offer/:id', (req, res) => { res.send('It hit put offer.\n'); });
  app.delete('/api/offer/:id', (req, res) => { res.send('It hit delete offer.\n'); });
};

