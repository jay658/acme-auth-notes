const express = require('express');
const app = express();
app.use(express.json());
const { models: { User, Note }} = require('./db');
const path = require('path');

app.use(express.json())

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/notes', async(req, res, next)=>{
  try{
    const note = await Note.create(req.body)
    res.send(note)
  }catch(err){
    next(err)
  }
})

app.delete('/api/notes/:id', async(req, res, next) =>{
  try{
    const toDestroy = await Note.findByPk(req.params.id)
    await toDestroy.destroy()
    res.sendStatus(204)
  }catch(err){
    next(err)
  }
})

app.post('/api/auth', async(req, res, next)=> {
  try {
    res.send({ token: await User.authenticate(req.body)});
  }
  catch(ex){
    next(ex);
  }
});


app.get('/api/auth', async(req, res, next)=> {
  try {
    res.send(await User.byToken(req.headers.authorization));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/notes', async(req, res, next)=> {
  try {
    const user = await User.byToken(req.headers.authorization);
    const notes = await Note.findAll({
      where:{userId:user.id}
    })
    res.send(notes);
  }
  catch(ex){
    next(ex);
  }
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
