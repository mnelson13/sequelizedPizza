let db = require("../models");

module.exports = function(app) {
    app.get("/", function(req,res){
        db.Pizza.findAll({})
            .then(function(data){
                
                let pizzas = [];
                let pizzasEaten = [];
        
                for(i in data){
                    if(data[i].devoured === false){
                        pizzas.push(data[i]);
                    } else if (data[i].devoured === true){
                        pizzasEaten.push(data[i]);
                    }
                }
                
                res.render("index", {
                    pizzas: pizzas,
                    pizzasEaten: pizzasEaten
                });
            })
    });

    app.post("/api/pizzas", function(req, res){
        db.Pizza.create({
            pizza_name: req.body.pizza
        }).then(function(data){
            res.json(data)
        })
        .catch(err => res.status(500).json(err))
    });

    app.put("/api/pizzas/:id", function(req, res){
        db.Pizza.update({
            devoured: true
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(function(data){
            res.json(data);
        })
    })
}