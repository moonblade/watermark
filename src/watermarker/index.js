const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('assess-watermarker');
const db = require('./db');
const { publish } = require('./pubsub');

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.post('/watermark', (req, res) => {
  const ticket = req.body.ticket || '';
  debug(`Watermark request for ticket ${ticket}`);
  db.get().sendMessage({ ticket })
    .then((result) => {
      debug('Got document to watermark');
      const rawDocument = result.document;
      debug(rawDocument);
      const document = JSON.parse(rawDocument) || {};
      const type = document.topic ? 'book' : 'journal';
      const watermark = {
        title: document.title,
        type,
        author: document.author,
        topic: document.topic,
      };
      document.watermark = watermark;
      debug('Inserted watermark');
      return db.update().sendMessage({ ticket, document: JSON.stringify(document) });
    })
    .then(async () => {
      debug('Updating status to completed');
      await publish({
        ticket,
        status: 'completed',
      });
      res.send();
    })
    .catch((error) => {
      debug('Watermark failed with error');
      debug(error);
      res.status(500).send(error);
    });
});

app.listen(port, () => debug(`Watermarker listening at http://localhost:${port}`));
