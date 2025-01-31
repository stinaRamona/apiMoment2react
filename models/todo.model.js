const Mongoose = require("mongoose"); 

const todoSchema = new Mongoose.Schema(
    {
        todo_title: {
            type: String, 
            required: true
        },
        todo_description: {
            type: String, 
            required: true
        },
        todo_priority: {
            type: Number, 
            required: true
        },
        todo_status: {
            type: String, 
            required: true, 
            default: "Ej påbörjad"
        }, 
        created: {
            type: Date, 
            default: Date.now
        }
    }
); 

const Todo = Mongoose.model("Todo", todoSchema); 

module.exports = Todo; 