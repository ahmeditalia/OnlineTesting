const app = require("../app").app;
const CreateOrExists = require("../database_controller/CreateOrExists");

app.post("/request_register", async (req, res) => {
    console.log("start");
    let user = req.body;
    let result;
    if (user.cv == "") {
        result = await CreateOrExists.checkExistsOrCreateHR(user);
    }
    else {
        result = await CreateOrExists.checkExistsOrCreateCandidate(user);
    }
    if(result)
    {
        res.send('{"success" : "Create"}');
    }
    else
    {
        res.send('{"success" : "Exists"}');
    }
});