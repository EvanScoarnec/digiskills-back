const express = require('express')
const router = express.Router()
const db = require("../models") // includes our model
const Question = db.question


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
}