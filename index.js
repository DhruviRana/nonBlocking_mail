const app = require("express")();
const { fork } = require("child_process")
const port = process.env.PORT || 3000;
app.get('/sendmail', (req, res) => {
    response1 = {
        semail: req.query.semail,
        password: req.query.password,
        remail: req.query.remail,
        subject: req.query.subject,
        message: req.query.message,
        crons: req.query.crons
    };
    const childProcess = fork('./sendmail.js');
    childProcess.send({ "semail": response1.semail, "password": response1.password, "remail": response1.remail, "sub": response1.subject, "msg": response1.message, "crons": response1.crons })
    childProcess.on("message", message => res.redirect(message));

});
app.listen(port, () => console.log("Listening on "+port))
