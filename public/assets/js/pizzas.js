$(document).ready(function(){

    $(document.body).on("submit", ".eatPizzaForm", function(event){
        event.preventDefault();

        let pizzaid = $(this).attr("id");
        let customer = $("#pizza" + pizzaid).val().trim();
        console.log("customer: " + customer);
        let customerId;

    
        $.get("/api/" + customer, function(data){
            if(data === ""){
                let newCustomer = {
                    customer: customer
                }
                $.post("api/customers", newCustomer)
                    .then(function(data){
                        console.log("added a new customer");
                        customerId = data.id
                        
                    }
                ).then(function(){
                    let existingCustomer = {
                        customerId: customerId
                    }
                    $.ajax("/api/pizzas/" + pizzaid, {
                        type: "PUT",
                        data: existingCustomer
                    }).then(function(){
                        console.log("udated id " + pizzaid);
                        location.reload();
                    });       
                });
            } else {
                customerId = data.id
                let existingCustomer = {
                        customerId: customerId
                    }
                $.ajax("/api/pizzas/" + pizzaid, {
                    type: "PUT",
                    data: existingCustomer
                }).then(function(){
                    console.log("udated id " + pizzaid);
                    location.reload();
                });       
                
            }
        })


    });

    $("#addPizza").on("submit", function(event){
        event.preventDefault();

        let newPizza = {
            pizza: $("#addPizza [name=pizza]").val().trim()
        };

        $.post("/api/pizzas", newPizza)
            .then(function(){
                console.log("added a new pizza");
                location.reload();
            })
    })

})