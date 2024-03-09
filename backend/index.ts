import express, {Request, Response, NextFunction} from 'express';
import UserService from './service/user-service.js';
import ProductService from './service/product-service.js';
import {stringify} from 'querystring';
import {IProductClient} from './domain/product/product.js';

const app = express();
app.use(express.urlencoded());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({message: 'hello'});
});
app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  const key = Object.keys(req.body); //key는 문자열
  console.log('###' + key); //###{"loginUserEmail":"a","loginUserPassword":"1111"}
  const email = JSON.parse(key[0]).loginUserEmail; //id,password는 객체
  const password = JSON.parse(key[0]).loginUserPassword;
  const userService = new UserService();
  const result = await userService.login(email, password);
  if (!result) {
    res.json({msg: '로그인 실패'});
  } else {
    res.json(result);
  }
});
app.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  const key = Object.keys(req.body);
  // let id: number = 1;
  const email = JSON.parse(key[0]).signupEmail as string;
  const password = JSON.parse(key[0]).signupPassword as string;
  const nickname = JSON.parse(key[0]).signupNickname as string;
  const money = JSON.parse(key[0]).signupMoney as number;
  const userType = JSON.parse(key[0]).signupUserType as 'seller' | 'buyer';
  const userService = new UserService();
  await userService.signUp({email, password, nickname, money, userType});
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
  const sellerProductList = await productService.getSellerProductsByEmail(sellerEmail);
  return res.json(sellerProductList);
});
app.post('/addProduct', async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  const key = Object.keys(req.body);
  const email = JSON.parse(key[0]).userEmail as string;
  const title = JSON.parse(key[0]).productTitle as string;
  const price = JSON.parse(key[0]).productPrice as number;
  const content = JSON.parse(key[0]).productContent as string;
  const productService = new ProductService();
  const ProductregisterResult = productService.registerProduct(email, title, price, content);
  if (!ProductregisterResult) {
    return res.json(false);
  } else {
    return res.json(true);
  }
});
app.get('/showAllProduct', async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  const productService = new ProductService();
  const AllProductList = await productService.getAllProduct();
  return res.json(AllProductList);
});
app.post('/buyerClickBuyButton', async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  const key = Object.keys(req.body);
  const productId = JSON.parse(key[0]).id as string;
  const buyerEmail = JSON.parse(key[0]).buyerEmail as string;
  const productService = new ProductService();
  const buyResult = await productService.buyProduct(productId, buyerEmail);
  if (buyResult === false) {
    return res.json({
      isSuccess: false,
      msg: '현재 재고가 없습니다.',
    });
  } else {
    return res.json({
      isSuccess: true,
      msg: '구매 성공',
    });
  }
});
app.post('/getBuyerShoppingList', async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  // const buyerEmail = JSON.stringify(req.body);
  const key = Object.keys(req.body);
  const buyerEmail = JSON.parse(key[0]) as string;
  console.log('##' + buyerEmail); //##a
  const productService = new ProductService();
  const buyerProductList = await productService.getBuyerProductsByEmail(buyerEmail);
  return res.json(buyerProductList);
});
app.listen(3000, () => {
  console.log('Server listenning on port:3000');
});
