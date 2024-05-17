import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`App is running on => http://localhost:${port}`)
})

let Id = 0;
let emailData = []

//middileware:
app.use(express.json());

//Endpoints:
app.get("/", (req, res) => {
    res.send("Welcome in the email manager..!")
})

//Endpoints to create a data
app.post("/save", (req, res) => {
    const { name, email } = req.body;
    const inputData = { id: ++Id, name, email }
    emailData.push(inputData);
    res.status(201)
        .send(inputData);

})

//Endpoint to read all the data:
app.get("/view", (req, res) => {
    res.status(201)
        .send(emailData);
})

//Endpoint to read a particular data based on id:
app.get("/search/:id", (req, res) => {
    const searchedData = emailData.find(email => email.id === parseInt(req.params.id));
    if (!searchedData) {
        return res.status(404)
            .send("Email you are searching for is not belong to the dataset !!")
    } else {
        res.status(201)
            .send(searchedData);
    }

});

//Endpoint to update data based on id:
app.put("/update/:id", (req, res) => {
    const currentData = emailData.find(email => email.id === parseInt(req.params.id))
    if (!currentData) {
        return res.status(404)
            .send("Data you are searching to update does'nt belongs to dataset..!");
    } else {
        const { name, email } = req.body;
        currentData.name = name;
        currentData.email = email;
        res.status(201)
            .send(currentData)
    }
});

//Endpoint to delete a data based on id:
app.delete("/delete/:id", (req, res) => {
    const indexToDelete = emailData.findIndex(email => email.id === parseInt(req.params.id));
    if (indexToDelete === -1) {
        return res.status(404)
            .send("Id you have given does not exist in the dataset...!");
    } else {
        emailData.splice(indexToDelete, 1);
        return res.send("Data based on your given id, deleted successfully.")
            .status(204);
    }
})



