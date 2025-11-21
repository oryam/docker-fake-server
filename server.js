const express = require('express');
const cors = require('cors');
const faker = require('faker');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/user', (req, res) => {
  res.json({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email()
  });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});