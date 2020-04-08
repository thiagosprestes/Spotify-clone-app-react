const app = require('./index');

//console.log(`Listening on ${process.env.PORT || 8888}`);
app.listen(process.env.PORT || 8888);
console.log(process.env.PORT);