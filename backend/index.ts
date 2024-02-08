import express, {Request, Response, NextFunction} from 'express';
import UserService from './service/user-service.js';

const app = express();
app.use(express.urlencoded());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({message: 'hello'});
});
app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  console.log('요청 받음');
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  console.log(req.body, 1);
  const key = Object.keys(req.body);
  console.log(key, 2);
  console.log(JSON.parse(key[0]), 3);
  const id = JSON.parse(key[0]).userId;
  const password = JSON.parse(key[0]).userPassword;
  const userService = new UserService();
  const result = await userService.login(id, password);
  if (!result) {
    console.log('로그인 실패');
    // return res.status(401).json({message: 'Login failed'});
  } else {
    res.json(result);
  }
});

app.listen(3000, () => {
  console.log('Server listenning on port:3000');
});
