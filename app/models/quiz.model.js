module.exports = (sequelize, Sequelize) => {
    const Quiz = sequelize.define("quizs", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.INTEGER
        }
    });

    return Quiz;
};