exports.bienvenida = (req, res) => {
  res.send(
    '¡Bienvenido al Mini Sistema de Alumnos! <a href="/alumnos">Lista de Alumnos</a>'
  );
};
