const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const api = express();
api.use(express.json());

const projects = [];

function middlewares(req, res, next) {
  const { method, url } = req;
  const log = `[${method.toUpperCase()}] ${url}`;
  console.time(log);
  next();
  console.timeEnd(log);
}

function validation(req, res, next) {
  const { id } = req.params;
  if (!isUuid(id)) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  return next();
}

api.use(middlewares);
api.use('/projects/:id', validation);

api.get('/projects', (req, res) => {
  const { title } = req.query;

  const result = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return res.status(200).json(result);
});

api.post('/projects', (req, res) => {
  const { title, owner } = req.body;
  const project = {
    id: uuid(),
    title,
    owner,
  };
  projects.push(project);
  return res.status(201).json(project);
});

api.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;
  const index = projects.findIndex((p) => p.id === id);

  if (index < 0) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[index] = project;

  return res.status(200).json(project);
});

api.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex((p) => p.id === id);

  if (index < 0) {
    return res.status(404).json({ error: 'Project not found' });
  }

  projects.splice(index, 1);

  return res.status(204).json();
});

api.listen(3030, () => {
  console.log('🚀 Server running...');
});
