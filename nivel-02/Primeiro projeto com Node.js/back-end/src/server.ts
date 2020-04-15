import express from 'express';
import routes from './routes';

const server = express();

server.use(express.json());
server.use(routes);

server.listen(3030, () => {
  console.log('🚀 Server started on port 3030');
});
