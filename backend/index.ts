import express, {Request, Response, NextFunction} from 'express';

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({message: 'hello'});
});
app.get('/login', (req: Request, res: Response, next: NextFunction) => {
  res.json({message: '환영합니다.'});
});

app.listen(3000, () => {
  console.log('Server listenning on port:3000');
});
