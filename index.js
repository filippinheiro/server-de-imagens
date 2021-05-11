const express = require('express')
const db = require('./database')

const app = express()


app.get('/alunos/:id', async (req, res) => {

  const {id} = req.params
  const {rows} = await db.query(`
  SELECT encode(foto_perfil, 'base64') perfil, nome_completo
  FROM Aluno
  WHERE id_aluno = $1
  `, [id])

   res.write(`
  <head>
    <title>Aluno</title>
    <style>
    table, th, td {
      border: 1px solid black;
    }
  </style>
  <body>
    <table>
      <tr>
        <th>Nome</th>
        <th>Foto de Perfil</th>
      </tr>
      <tr>
        <td>${rows[0].nome_completo}</td>
        <td><img style='display:block; width:500px;height:500px;' id='base64image'
       src='data:image/jpeg;base64, ${rows[0].perfil}'/></td>
      </tr>
    </table>
  </body>
  `)
  res.end()
})

app.get('/livros', async (req, res) => {

  const {rows} = await db.query(`
  SELECT encode(capa, 'base64') capa, titulo
  FROM Acervo_De_Exemplares
  `)

   res.write(`
  <head>
    <title>Livros</title>
    <style>
    table, th, td {
      border: 1px solid black;
    }
  </style>
  <body>
    <table>
      <tr>
        <th>Título</th>
        <th>Capa</th>
      </tr>
      ${rows.map( item =>
        `<tr>
          <td>${item.titulo}</td>
          <td><img style='display:block; width:500px;height:500px;' id='base64image'
              src='data:image/jpeg;base64, ${item.capa}'/></td>
        </tr>
        `)
      }
    </table>
  </body>
  `)
  res.end()
})


app.get('/alunos', async (req, res) => {

  const {rows} = await db.query(`
  SELECT encode(foto_perfil, 'base64') perfil, nome_completo
  FROM Aluno
  `)

   res.write(`
  <head>
    <title>Alunos</title>
    <style>
    table, th, td {
      border: 1px solid black;
    }
  </style>
  <body>
    <table>
      <tr>
        <th>Nome</th>
        <th>Foto de Perfil</th>
      </tr>
      ${rows.map( item =>
        `<tr>
          <td>${item.nome_completo}</td>
          <td><img style='display:block; width:500px;height:500px;' id='base64image'
              src='data:image/jpeg;base64, ${item.perfil}'/></td>
        </tr>
        `)
      }
    </table>
  </body>
  `)
  res.end()
})


app.get('/livros/:id', async (req, res) => {

  const {id} = req.params
  const {rows} = await db.query(`
  SELECT encode(capa, 'base64') capa, titulo
  FROM Acervo_de_exemplares
  WHERE registro_sistema = $1
  `, [id])

   res.write(`
  <head>
    <title>Livro</title>
    <style>
    table, th, td {
      border: 1px solid black;
    }
  </style>
  <body>
    <table>
      <tr>
        <th>Título</th>
        <th>Capa</th>
      </tr>
      <tr>
        <td>${rows[0].titulo}</td>
        <td><img style='display:block; width:500px;height:500px;' id='base64image'
       src='data:image/jpeg;base64, ${rows[0].capa}' /></td>
      </tr>
    </table>
  </body>
  `)
  res.end()

})

app.get('/emprestimos', async(req,res) => {
   const queryString = `
   select a.nome_completo nome,
      ace.titulo titulo,
      encode(a.foto_perfil,'base64') perfil,
      encode(ace.capa,'base64') capa

   from aluno a
	   inner join emprestimo e on e.id_aluno = a.id_aluno
	   inner join emprestimoexemplar ee on ee.id_emprestimo = e.id_emprestimo
	   inner join exemplares ex on ex.id_exemplar = ee.id_exemplar
	   inner join acervo_de_exemplares ace on ace.registro_sistema = ex.registro_sistema;
   `

  const {rows} = await db.query(queryString)

    res.write(`
   <head>
    <title>Todos os Empresiimos</title>
    <style>
      table, th, td {
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <table>
      <tr>
        <th>Alunos com emprestimo</th>
        <th>Foto</th>
        <th>Livro</th>
        <th>Capa</th>
      </tr> ${
      rows.map(item =>
        `
        <tr>
          <td>${item.nome}</td>
          <td><img style='display:block; width:500px;height:500px;' id='base64image'
            src='data:image/jpeg;base64, ${item.perfil}'/></td>
          <td>${item.titulo}</td>
          <td><img style='display:block; width:500px;height:500px;' id='base64image'
            src='data:image/jpeg;base64, ${item.capa}'/></td>
          </tr>
            `)
    }
    </table>
   </body>
   `
   )
   res.end()
})


app.get('/emprestimos/:id', async(req,res) => {

  const {id} = req.params

  const queryString = `
  select a.nome_completo nome,
    ace.titulo titulo,
    encode(a.foto_perfil,'base64') perfil,
    encode(ace.capa,'base64') capa
  from aluno a
	  inner join emprestimo e on e.id_aluno = a.id_aluno
	  inner join emprestimoexemplar ee on ee.id_emprestimo = e.id_emprestimo
	  inner join exemplares ex on ex.id_exemplar = ee.id_exemplar
	  inner join acervo_de_exemplares ace on ace.registro_sistema = ex.registro_sistema
  where a.id_aluno=$1;
  `

  const {rows} = await db.query(queryString, [id])

  if(rows[0]) {
     res.write(`
    <head>
    <title>Aluno</title>
    <style>
      table, th, td {
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <table>
      <tr>
        <th>Aluno</th>
        <th>Foto</th>
        <th>Livro</th>
        <th>Capa</th>
      </tr> ${
      rows.map(item =>
        `
        <tr>
          <td>${item.nome}</td>
          <td><img style='display:block; width:500px;height:500px;' id='base64image'
            src='data:image/jpeg;base64, ${item.perfil}'/></td>
          <td>${item.titulo}</td>
          <td><img style='display:block; width:500px;height:500px;' id='base64image'
            src='data:image/jpeg;base64, ${item.capa}'/></td>
          </tr>
      `)
    }
    </table>
   </body>
    `)
    res.end()
  } else {
     res.write(
      `<h1>Aluno sem emprestimos</h1>`
    )
    res.end()
  }
})

app.listen(3333, () => {
  console.log("Server running")
})
