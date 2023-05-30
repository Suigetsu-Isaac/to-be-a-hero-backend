import app from './app.js';
const porta = process.env.PORT || 3333



app.listen(porta,console.log("rodando na porta: "+porta));