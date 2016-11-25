var Student = require('./modelo/student');

// Obtiene todos los objetos Student de la base de datos
exports.getStudent = function (req, res){
    Student.find(
        function(err, student) {
            if (err)
                res.send(err)
            res.json(student); // devuelve todos los Student en JSON
        }
    );
}

// Guarda un objeto Student en base de datos
exports.setStudent = function(req, res, err) {
    if ((isNaN(req.body.telefono.fijo)) || (isNaN(req.body.telefono.movil)))
    {
        return res.send();
    }
    // Creo el objeto Student
    Student.create(
        {nombre : req.body.nombre,direccion: req.body.direccion, telefono: {fijo:req.body.telefono.fijo, movil:req.body.telefono.movil}},
        function(err, student) {
            if (err)
                res.send(err);
            // Obtine y devuelve todos los students tras crear uno de ellos
            Student.find(function(err, student) {
                if (err)
                    res.send(err)
                res.json(student);
            });
        });

}

// Modificamos un objeto Student de la base de datos
exports.updateStudent = function(req, res){
    Student.update( {_id : req.params.student_id},
        {$set:{nombre : req.body.nombre,direccion: req.body.direccion, telefono: {fijo:req.body.telefono.fijo, movil:req.body.telefono.movil}}},
        function(err, fijo) {
            if (err)
                res.send(err);
            // Obtine y devuelve todos los students tras crear uno de ellos
            Student.find(function(err, student) {
                if (err)
                    res.send(err)
                res.json(student);
            });
        });
}

// Elimino un objeto Student de la base de Datos
exports.removeStudent = function(req, res) {
    Student.remove({_id : req.params.student_id}, function(err, student) {
        if (err)
            res.send(err);
        // Obtine y devuelve todos los students tras borrar uno de ellos
        Student.find(function(err, student) {
            if (err)
                res.send(err)
            res.json(student);
        });
    });
}

var Subject = require('./modelo/subject');

// Obtiene todos los objetos Asignatura de la base de datos
exports.getSubject = function (req, res){
    Subject.find(
        function(err, subject) {
            if (err)
                res.send(err)
            res.json(subject); // devuelve todas las Asignaturas en JSON
        }
    );
}
// Filtra una asignatura por alumno
exports.filterSubject = function (req, res){

    Subject.find({alumno: req.body.alumno},
        function(err, subject) {
            if (err)
                res.send(err)
            res.json(subject); // devuelve todas las Asignaturas en JSON
        }
    );
}
// Filtra una asignatura por periodo
exports.filterSubject2 = function (req, res){

    Subject.find({when: req.body.when},
        function(err, subject) {
            if (err)
                res.send(err)
            res.json(subject); // devuelve todas las Asignaturas en JSON
        }
    );
}

// Guarda un objeto Asignatura en base de datos
exports.setSubject = function(req, res, err) {

    Student.find( {nombre: req.body.alumno},
        function(err, student) {
            if (student==false) {
                res.send();
            }

            else {

                Subject.find( {nombre:req.body.nombre, alumno: req.body.alumno, when:req.body.when},
                    function(err, student) {
                        if (student != false) {
                            var repetido = "repetido";
                            res.send(repetido);
                        }
                        else {
                            // Creo el objeto Asignatura
                            Subject.update(
                                {nombre: req.body.nombre}, {$push: {alumno: req.body.alumno},when:req.body.when}, {upsert: true},
                                function (err, subject) {
                                    if (err)
                                        res.send(err);
                                    // Obtine y devuelve todas las asignaturas tras crear una de ellas
                                    Subject.find(function (err, subject) {
                                        if (err)
                                            res.send(err)
                                        res.json(subject);
                                    });
                                });
                        }
                    });
            }
        });
}

// Modificamos un objeto Subject de la base de datos
exports.updateSubject = function(req, res){
    Subject.update( {_id : req.params.subject_id},
        {$set:{nombre : req.body.nombre,alumno: [req.body.alumno],when:req.body.when}},
        function(err, subject) {
            if (err)
                res.send(err);
            // Obtine y devuelve todas las asignaturas tras crear una de ellas
            Subject.find(function(err, subject) {
                if (err)
                    res.send(err)
                res.json(subject);
            });
        });
}

// Elimino un objeto Asignatura de la base de Datos
exports.removeSubject = function(req, res) {
    Subject.remove({_id : req.params.subject_id}, function(err, subject) {
        if (err)
            res.send(err);
        // Obtine y devuelve todas las asignaturas tras borrar una de ellas
        Subject.find(function(err, subject) {
            if (err)
                res.send(err)
            res.json(subject);
        });
    });
}
