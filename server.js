const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/login', (req, res) => {
    res.send({
      token: 'pass'
    });
  });

app.listen(3080, () => console.log('API is running on http://localhost:3080/login'));
