const json = require("body-parser/lib/types/json");
const {INTEGER} = require("sequelize");
const {STRING} = require("sequelize");
const {BOOLEAN} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("questions", {
        id: {
            type: INTEGER,
            primaryKey: true
        },
        quizid: {
            type: INTEGER
        },
        description: {
            type: STRING
        }
    });

    return Question;
};