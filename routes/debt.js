export default (app) => {
  app.post('/api/debt', (req, res) => { res.send('It hit post debt\n'); });
  app.get('/api/debts', (req, res) => { res.send('It hit get debts.\n'); });
  app.put('/api/debt/:id', (req, res) => { res.send('It hit put debt.\n'); });
  app.delete('/api/debt/:id', (req, res) => { res.send('It hit delete debt.\n'); });
};

