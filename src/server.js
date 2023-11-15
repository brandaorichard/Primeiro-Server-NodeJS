// Importacao do arquivo app.js
const app = require('./app');

// O start é provido pelo trecho app.listen e recebe 2 params (porta) (funcao, ex: log "Server running!")
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
