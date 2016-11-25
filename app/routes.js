
var Persona = require('./modelo/student');
var Subject = require('./modelo/subject');
var Controller = require ('./controller');

module.exports = function(app) {

    // devolver todos los Student
    app.get('/api/student', Controller.getStudent);
    // Crear una nuevo Student
    app.post('/api/student', Controller.setStudent);
    // Modificar los datos de un Student
    app.put('/api/student/:student_id', Controller.updateStudent);
    // Borrar un Student
    app.delete('/api/student/:student_id', Controller.removeStudent);
    // devolver todas las asignaturas
    app.get('/api/subject', Controller.getSubject);
    // filtrar por alumno
    app.post('/api/sub', Controller.filterSubject);
    // Crear una nueva asignatura
    app.post('/api/subject', Controller.setSubject);
    // Modificar los datos de una Asignatura
    app.put('/api/subject/:subject_id', Controller.updateSubject);
    // Borrar una asignatura
    app.delete('/api/subject/:subject_id', Controller.removeSubject);
    // application
    app.get('*', function(req, res) {
        res.sendfile('./angular/index.html'); // Carga única de la vista
    });
};
