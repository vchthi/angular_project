//ket noi collection 

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId   //khoa chinh

const athletesSchema = new Schema({
    name: {type: String, require: true},
    yearofbirth:{type:Number, require:true},
    competition:{type:String, require:true}
})

module.exports = mongoose.models.athletes   //kiem tra trong model co ton tai athletes nao chua
|| mongoose.model('athletes',athletesSchema)

