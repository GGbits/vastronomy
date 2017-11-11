/**
 * Created by justin on 6/5/2017.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var characterSchema = new Schema({
    characterName: String,
    description: String,
    health: Number,
    willpower: Number,
    mainSkills: Array,
    mentalSkills: Array,
    physicalSkills: Array,
    socialSkills: Array,
    merits: Array
});

module.exports = mongoose.model('Character', characterSchema);

