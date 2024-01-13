import express, {Request, Response, NextFunction} from 'express';

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63343');
  res.json({
    message: 'hello',
  });
});

app.post('/login', (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = JSON.parse(Object.keys(req.body)[0]);
  console.log(email);
  console.log(password);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63343');
  res.json({
    message: `${email}님 환영합니당`,
  });
});

app.listen(3000, () => {
  console.log('Server listening on port: 3000');
});
