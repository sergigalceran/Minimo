

angular.module('MainApp', [])

function subjectController($scope, $http) {
    $scope.newSubject = {};
    $scope.subjects = {};
    $scope.selected = false;


$scope.cleanall = function(){
    $scope.newSubject = {};
};

// Obtenemos todos los datos de la base de datos de los jefes
$http.get('/api/subject').success(function(data) {
        $scope.subjects = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });

    // Función para filtrar por alumno
    $scope.filterSubject = function(res) {

        $http.post('/api/sub', $scope.newSubject)
            .success(function (data) {
                if (data==false) {
                    alert("Al alumno que busca no se le ha asociado a ninguna asignatura");
                }
                else {
                    $scope.subjects = data;
                    $scope.cleanall(); // Borramos los datos del formulario
                }
                })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };
    // Función para filtrar por nombre
    $scope.filterSubject2 = function(res) {

        $http.post('/api/sub', $scope.newSubject)
            .success(function (data) {
                if (data==false) {
                    alert("No hay ninguna asignatura");
                }
                else {
                    $scope.subjects = data;
                    $scope.cleanall(); // Borramos los datos del formulario
                }
                })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

// Función para registrar una asignatura
$scope.registrarSubject = function(res) {

        $http.post('/api/subject', $scope.newSubject)
            .success(function (data) {

                if (data == false)
                {
                    alert("El alumno que intentas añadir aún no ha sido creado")
                }
                    else if (data == "repetido")
                {
                    alert("El alumno ya ha sido añadido a esta asignatura")
                }
                else {
                    $scope.cleanall(); // Borramos los datos del formulario
                    $scope.subjects = data;
                }
            })
            .error(function (data) {
                $scope.cleanall(); // Borramos los datos del formulario
                alert(data);
                //console.log('Error: ' + data);
            });

};

// Función para editar los datos de una asignatura
$scope.modificarSubject = function(newSubject) {
    $http.put('/api/subject/' + $scope.newSubject._id, $scope.newSubject)
        .success(function(data) {
            $scope.cleanall(); // Borramos los datos del formulario
            $scope.subjects = data;
            $scope.selected = false;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
};

// Función que borra un objeto asignatura conocido su id
$scope.borrarSubject = function(newSubject) {
    $http.delete('/api/subject/' + $scope.newSubject._id)
        .success(function(data) {
            $scope.cleanall();
            $scope.subjects = data;
            $scope.selected = false;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
};

// Función para coger el objeto asignatura seleccionado en la tabla
$scope.selectSubject = function(subject) {
    $scope.newSubject = subject;
    $scope.selected = true;
    console.log($scope.newSubject, $scope.selected);
};
}
