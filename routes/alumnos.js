const express = require("express");
const router = express.Router();
const alumnosController = require("../controllers/alumnosController");

router.get("/", alumnosController.listaAlumnos);
router.get("/:legajo", alumnosController.verAlumno);
router.post("/", alumnosController.agregarAlumno);
router.put("/:legajo", alumnosController.modificarAlumno);
router.delete("/:legajo", alumnosController.eliminarAlumno);

module.exports = router;
