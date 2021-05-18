const {INTEGER} = require("sequelize");
const {STRING} = require("sequelize");
const {BOOLEAN} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Quiz = sequelize.define("quizs", {
        id: {
            type: INTEGER,
            primaryKey: true
        },
        name: {
            type: STRING
        }
    });

    return Quiz;
};