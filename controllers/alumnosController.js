const fs = require("fs");
const alumnosFilePath = "./data/alumnos.json";

exports.listaAlumnos = (req, res) => {
  try {
    const alumnos = JSON.parse(fs.readFileSync(alumnosFilePath, "utf-8"));
    const nombresAlumnos = alumnos.alumnos.map((alumno) => alumno.nombre);

    let html = "<html><head><title>Listado de Alumnos</title></head><body>";
    html += "<p>Listado de Alumnos</p>";
    html += "<ul>";

    nombresAlumnos.forEach((nombre, index) => {
      html += `<li>${nombre} <a href="/alumnos/${index + 1}">Ver Detalle</a></li>`;
    });

    html += "</ul></body></html>";

    res.send(html);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de alumnos" });
  }
};

exports.verAlumno = (req, res) => {
  const legajo = req.params.legajo;
  try {

    const alumnos = JSON.parse(fs.readFileSync(alumnosFilePath, "utf-8"));

    const alumno = alumnos.alumnos.find((a) => a.legajo === legajo);

    if (alumno) {

      res.json(alumno);

    } else {

      res.status(404).json({ error: "Alumno no encontrado" });

    }
  } catch (error) {

    res.status(500).json({ error: "Error al buscar el alumno" });

  }
};

exports.agregarAlumno = (req, res) => {
  try {

    const alumnos = JSON.parse(fs.readFileSync(alumnosFilePath, "utf-8"));

    const nuevoAlumno = req.body;

    nuevoAlumno.legajo = (alumnos.alumnos.length + 1).toString();

    alumnos.alumnos.push(nuevoAlumno);

    fs.writeFileSync(alumnosFilePath, JSON.stringify(alumnos, null, 2));
    res.status(201).json(nuevoAlumno);

  } catch (error) {

    res.status(500).json({ error: "Error al agregar el alumno" });

  }
};

exports.modificarAlumno = (req, res) => {
  const legajo = req.params.legajo;

  try {

    const alumnos = JSON.parse(fs.readFileSync(alumnosFilePath, "utf-8"));

    const index = alumnos.alumnos.findIndex((a) => a.legajo === legajo);
    if (index !== -1) {

      alumnos.alumnos[index] = { ...alumnos.alumnos[index], ...req.body };

      fs.writeFileSync(alumnosFilePath, JSON.stringify(alumnos, null, 2));
      res.json(alumnos.alumnos[index]);

    } else {

      res.status(404).json({ error: "Alumno no encontrado" });

    }
  } catch (error) {

    res.status(500).json({ error: "Error al modificar el alumno" });

  }
};

exports.eliminarAlumno = (req, res) => {
  const legajo = req.params.legajo;

  try {

    const alumnos = JSON.parse(fs.readFileSync(alumnosFilePath, "utf-8"));

    const index = alumnos.alumnos.findIndex((a) => a.legajo === legajo);

    if (index !== -1) {

      const alumnoEliminado = alumnos.alumnos.splice(index, 1)[0];

      fs.writeFileSync(alumnosFilePath, JSON.stringify(alumnos, null, 2));
      res.json(alumnoEliminado);

    } else {

      res.status(404).json({ error: "Alumno no encontrado" });

    }
  } catch (error) {

    res.status(500).json({ error: "Error al eliminar el alumno" });

  }
};
