// importa o express
const express = require('express');

const teams = [
  {
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPF',
  },
  {
    id: 2,
    name: 'Clube Atlético Mineiro',
    initials: 'CAM',
  },
];

// Inicializa a funcao express()
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!' }));

// Cria um endpoint do tipo GET com a rota /teams
app.get('/teams', (req, res) => res.status(200).json({ teams }));

// Cadastra times por meio do método POST
app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);

  res.status(201).json({ team: newTeam });
});

// Edita times por meio do método PUT
// Para alterar algum time, eh necessario o id deste time e dos novos dados. Os novos dados vêm no corpo da requisição e o id vem por parâmetro. Feito isso, na sequencia procurar dentro do array teams o time correspondente com aquele id e alterar as informações dele. Caso nao achar nenhum time caira na tratativa de erro:
app.put('/teams/:id', (req, res) => {
  const { id } = req.params; // id do item: via parametro
  const { name, initials } = req.body; // Info a ser add: via body

  const updateTeam = teams.find((team) => team.id === Number(id)); //  desconstroi essas informações e cria a variável updateTeam, na qual armazena o resultado da busca pelo id que recebe como parâmetro dentro do array de times.
  // Importante: Todo dado que vem por params ou por query (ou seja dados enviados pela URL do navegador) são recebidos como string. Por isso o uso do “parser” desse valor para Number

  if (!updateTeam) {
    return res.status(404).json({ message: 'Team not found' });
  } // tratativa de erro caso não seja encontrado um time correspondente

  updateTeam.name = name;
  updateTeam.initials = initials;
  res.status(200).json({ updateTeam });
  // Feito isso, ir no thunder client fazer uma requisicao do tipo put
});

// Exporta variavel que contem a funcao do express para o arquivo server.js
module.exports = app;