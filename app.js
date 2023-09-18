const express = require("express");
const app = express();
const port = 2023;

app.use(express.json());

// Rutas
const indexRouter = require("./routes/index");
const alumnosRouter = require("./routes/alumnos");

app.use("/", indexRouter);
app.use("/alumnos", alumnosRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
