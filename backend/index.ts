import express, {Request, Response, NextFunction} from 'express';
import UserService from './service/user-service.js';
import ProductService from './service/product-service.js';
import {stringify} from 'querystring';

const app = express();
app.use(express.urlencoded());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({message: 'hello'});
});
app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  const key = Object.keys(req.body); //key는 문자열
  const id = JSON.parse(key[0]).userId; //id,password는 객체
  const password = JSON.parse(key[0]).userPassword;
  const userService = new UserService();
  const result = await userService.login(id, password);
  if (!result) {
    res.json({msg: '로그인 실패'});
  } else {
    res.json(result);
  }
});
app.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  const key = Object.keys(req.body);
  let id: number = 1;
  const email = JSON.parse(key[0]).signupEmail as string;
  const password = JSON.parse(key[0]).signupPassword as string;
  const nickname = JSON.parse(key[0]).signupNickname as string;
  const money = JSON.parse(key[0]).signupMoney as number;
  const userType = JSON.parse(key[0]).signupUserType as 'seller' | 'buyer';
  const userService = new UserService();
  await userService.signUp({id, email, password, nickname, money, userType});
  return res.json(true);
});
app.post('/getSellerProducts', async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  //Object.keys(obj)는 순회가능한 객체에서 key만 추출
  const key = Object.keys(req.body);
  const sellerEmail = JSON.parse(key[0]).userEmail as string;
  // const sellerEmail = JSON.parse(key[0]).email as string;
  // const sellerEmail = req.body.userEmail as string;
  const productService = new ProductService();
  const sellerProductList = await productService.getSellerProducts(sellerEmail);
  return res.json(sellerProductList);
});
app.listen(3000, () => {
  console.log('Server listenning on port:3000');
});
