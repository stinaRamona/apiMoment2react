const Todo = require("../models/todo.model"); 
const Joi = require("joi"); 


module.exports = [
    //Hämta in todos
    {
        method: "GET", 
        path: "/todo", 
        handler: async (request, h) => {
            return await Todo.find(); 
        }
    },
    
    //hämta bara en todo 
    {
        method: "GET", 
        path: "/todo/{id}", 
        handler: async (request, h) => {
            try {
                const todo = await Todo.findById(request.params.id); 
                return todo || h.response("Todon hittades inte").code(404)
            } catch(err) {
                return h.response(err).code(500)
            } 
        } 
    },

    //skapa ny todo
    {
        method: "POST",
        path: "/todo",
        options: {
            //validering för tilläggning av todo med joi
            validate: {
                payload: Joi.object({
                    todo_title: Joi.string().min(2).required(), 
                    todo_description: Joi.string().max(200), 
                    todo_priority: Joi.number().min(1).max(5).required(),
                    todo_status: Joi.string().required(),
                }) 
            }
        },
        handler: async (request, h) => {
            const todo = new Todo(request.payload);
            return await todo.save();
        }
    },

    //uppdatera en todo
    {
        method: "PUT",
        path: "/todo/{id}", 
        options: {
            //validering för uppdatering av todo med joi
            validate: {
                payload: Joi.object({
                    todo_title: Joi.string().min(2).required(), 
                    todo_description: Joi.string().max(200), 
                    todo_priority: Joi.number().min(1).max(5).required(),
                    todo_status: Joi.string().required(),
                }) 
            }
        }, 
        handler: async (request, h) => {
            try {
                return await Todo.findByIdAndUpdate(
                    request.params.id,
                    request.payload,
                    { new: true }
                );

            } catch (err) {
                return h.response(err).code(500);
            }
        }
    }, 

    //ta bort en todo
    {
        method: "DELETE", 
        path: "/todo/{id}", 
        handler: async (request, h) => {
            try {
                return await Todo.findByIdAndDelete(request.params.id);
            } catch(err) {
                return h.response(err).code(500); 
            }   
        }
    }
]