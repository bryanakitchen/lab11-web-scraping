const app = require('./lib/app');

const PORT = process.env.PORT || 3011;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
