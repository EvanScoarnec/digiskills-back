const express = require('express')
const router = express.Router()
const db = require("../models") // includes our model
const Question = db.question
const Answer = db.answer
const Quiz = db.quiz


module.exports = function(app) {
    app.post('/questions', async (req, res) => {
        try {
            const {id} = req.body
            const {quizid} = req.body
            const {description} = req.body

            const question = await Question.create({
                id,
                quizid,
                description
            })

            return res.status(201).json(question)
        } catch (error) {
            return res.status(500).json({"error": error.message})
        }
    })

// get all quiz questions
    app.get('/questions', async (req, res) => {
        try {
            const questions = await Question.findAll()
            return res.status(200).json(questions)
        } catch (error) {
            return res.status(500).json({"error": error.message})
        }
    })

    app.get('/questions/:id', async (req, res) => {
    try {
        const id = req.params.id

        const question = await Question.findOne({
            where: {
                'id': id
            }
        })        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
    })

    app.put('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        const { id, quizid, description } = req.body

        let question = await Question.findOne({
            where: {
                'id': _id
            }
        })

        if(!question){
            question = await Question.create({
                id,
                quizid,
                description
            })  
            return res.status(201).json(question)
        }else{
            question.id = id
            question.quizid = quizid
            question.description = description
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
    })

    app.delete('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        
        const question = await Question.destroy({
            where: {
                id: _id
            }
        })

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
    })

    app.post('/answers', async (req, res) => {
        try {
            const {id} = req.body
            const {questionid} = req.body
            const {description} = req.body
            const {isCorrect} = req.body

            const answer = await Answer.create({
                id,
                questionid,
                description,
                isCorrect
            })

            return res.status(201).json(answer)
        } catch (error) {
            return res.status(500).json({"error": error.message})
        }
    })

    app.get('/answers', async (req, res) => {
        try {
            const answers = await Answer.findAll()
            return res.status(200).json(answers)
        } catch (error) {
            return res.status(500).json({"error": error.message})
        }
    })

    app.get('/answers/:id', async (req, res) => {
    try {
        const id = req.params.id

        const answer = await Answer.findOne({
            where: {
                'id': id
            }
        })        
        if(!answer){
            return res.status(404).json({})
        }else{
            return res.status(200).json(answer)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
    })

    app.get('/quizs', async (req, res) => {
        try {
            const quizs = await Quiz.findAll()
            return res.status(200).json(quizs)
        } catch (error) {
            return res.status(500).json({"error": error.message})
        }
    })

    app.get('/quizs/:id', async (req, res) => {
    try {
        const id = req.params.id

        const quiz = await Quiz.findOne({
            where: {
                'id': id
            }
        })        
        if(!quiz){
            return res.status(404).json({})
        }else{
            return res.status(200).json(quiz)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
    })
}