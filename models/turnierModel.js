const mongoose = require ('mongoose')

const turnierSchema = mongoose.Schema(
    {
        turnierMaster:{
            type: String,
            required: [true]
        },
        turnierName:{
            type: String,
            rrequired: [true, "Bitte gebe den Turniernamen an."]
        },
        startDatum: {
            type: Date, 
            required: [true, "Bitte das Startdatum angeben."] 
        },
        endDatum: {
            type: Date, 
            required: [true, "Bitte das Enddatum angeben."] 
        },
        veranstaltungsort:{
            type: String,
            required: [true, "Bitte den Veranstaltungsort angeben."] 
        },
        startZeit: {
            type: String, 
            required: [true, "Bitte die Startzeit angeben."]
        },
        kosten: {
            type: String,
            required: [true, "Bitte die Kosten angeben."]
        },
        turnierTeilnehmer:{
            type: Array,
            required: [true]
        },
    },
    {
        timestamps:true
    }
)

const Turnier = mongoose.model('Turnier', turnierSchema)

module.exports = Turnier;