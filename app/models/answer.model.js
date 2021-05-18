const json = require("body-parser/lib/types/json");
const {INTEGER} = require("sequelize");
const {STRING} = require("sequelize");
const {BOOLEAN} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define("answer", {
        id: {
            type: INTEGER,
            primaryKey: true
        },
        questionid: {
            type: INTEGER
        },
        description: {
            type: STRING
        },
        isCorrect: {
            type: BOOLEAN
        }
    });

    return Answer;
};