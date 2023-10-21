const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName=req.body.fn;
    var lastName=req.body.ln;
    var email=req.body.em;

    var data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData= JSON.stringify(data);

    var options={
        url: "https://us21.api.mailchimp.com/3.0/lists/8e43239f9d",
        method: "POST",
        headers: {
            "Authorization":"tarun1 2f238d58788fcb7390492071427ad575-us21"
        },
        body:jsonData
        
    } 

    request(options, function(error,response, body){
        if(error){
            res.send("There was an error in signing up , please try again!");
        } else{
            if(response.statusCode === 200){
                res.sendFile(__dirname+"/success.html");
            } else{
                res.sendFile(__dirname+"/failure.html");
            }
            console.log(response.statusCode);
        }
    });

    //console.log("name: "+firstName+lastName+" E-mail: "+email);
})

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});


//api key
// 2f238d58788fcb7390492071427ad575-us21

//list id
//8e43239f9d