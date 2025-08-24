const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/packet', (req, res) => {
  const { type, entity, correction, contact, timestamp } = req.body;
  const payload = `${type}|${entity}|${correction}|${contact}|${timestamp}`;
  const hash = crypto.createHash('sha256').update(payload).digest('hex');

  console.log(`[${timestamp}] ${type} packet received for ${entity}`);
  console.log(`Correction Authority: ${correction}`);
  console.log(`Hash: ${hash}`);

  res.status(200).json({ status: 'Packet received', hash });
});

app.listen(port, () => {
  console.log(`Registry server listening at http://localhost:${port}`);
});

