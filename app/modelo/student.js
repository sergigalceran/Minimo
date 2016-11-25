/**
 * Created by tono on 11/04/2016.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Student', {
    nombre: String,
    direccion: String,
    telefono: {
        fijo: Number,
        movil: Number
    }
});