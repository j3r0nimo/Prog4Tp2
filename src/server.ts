import { makeApp } from "./app";

const app = makeApp();
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});