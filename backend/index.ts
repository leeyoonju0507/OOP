import express, {Request, Response, NextFunction} from 'express';
import UserService from './service/user-service.js';
import ProductService from './service/product-service.js';
import {stringify} from 'querystring';
import {IProductClient} from './domain/product/product.js';
import 'dotenv/config';

// console.log(process.env)

const app = express();
const userService = new UserService();
const productService = new ProductService();

app.use(express.json());
app.use(express.urlencoded());

const setHeader = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_SERVER_HOST ?? '*');
  next();
};
const parseBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    next();
  }
  const jsonStr = Object.keys(req.body)[0];
  const json = JSON.parse(jsonStr);
  req.body = json;
  next();
};

app.get('/', setHeader, (req: Request, res: Response, next: NextFunction) => {
  res.json({message: 'hello'});
});
// app.post('/login',setHeader,parseBody, async (req: Request, res: Response, next: NextFunction) => {
//   // console.log(req.body);//{ '{"loginUserEmail":"a","loginUserPassword":"1111"}': '' }

//   // const key = Object.keys(req.body); //key는 문자열: ['{"loginUserEmail":"a","loginUserPassword":"1111"}']

//   // const email = JSON.parse(key[0]).loginUserEmail; //id,password는 객체
//   // const password = JSON.parse(key[0]).loginUserPassword;

//   const {loginUserEmail,loginUserPassword} = req.body;
//   const email = loginUserEmail;
//   const password = loginUserPassword;

//   const result = await userService.login(email, password);
//   if (!result) {
//     res.json({msg: '로그인 실패'});
//   } else {
//     res.json(result);
//   }
// });
app.post(
  '/user/login',
  setHeader,
  parseBody,
  async (req: Request, res: Response, next: NextFunction) => {
    const {loginUserEmail} = req.query as {
      loginUserEmail: string;
    };
    const {loginUserPassword} = req.body as {loginUserPassword: string};
    const email = loginUserEmail;
    const password = loginUserPassword;

    const result = await userService.login(email, password);
    if (!result) {
      return res.json({msg: '로그인 실패'});
    } else {
      return res.json(result);
    }
  },
);
app.post(
  '/user/signup',
  setHeader,
  parseBody,
  async (req: Request, res: Response, next: NextFunction) => {
    // const key = Object.keys(req.body);
    // // let id: number = 1;
    // const email = JSON.parse(key[0]).signupEmail as string;
    // const password = JSON.parse(key[0]).signupPassword as string;
    // const nickname = JSON.parse(key[0]).signupNickname as string;
    // const money = JSON.parse(key[0]).signupMoney as number;
    // const userType = JSON.parse(key[0]).signupUserType as 'seller' | 'buyer';
    const {signupEmail, signupPassword, signupNickname, signupMoney, signupUserType} = req.body;
    const email = signupEmail;
    const password = signupPassword;
    const nickname = signupNickname;
    const money = signupMoney;
    const userType = signupUserType;
    await userService.signUp({email, password, nickname, money, userType});
    return res.json(true);
  },
);
//Seller의 MY 판매목록
app.get('/products', setHeader, async (req: Request, res: Response, next: NextFunction) => {
  const {type, email} = req.query as {type: string; email: string};
  if (!email) {
    return res.json({msg: '이메일을 입력해주세요'});
  }
  if (type === 'seller') {
    const sellerProductList = await productService.getSellerProductsByEmail(email);
    return res.json(sellerProductList);
  } else if (type === 'buyer') {
    return res.json([]);
  }
});
app.post(
  '/product',
  setHeader,
  parseBody,
  async (req: Request, res: Response, next: NextFunction) => {
    const {userEmail, productTitle, productPrice, productContent} = req.body;
    const email = userEmail;
    const title = productTitle;
    const price = productPrice;
    const content = productContent;

    const ProductregisterResult = productService.registerProduct(email, title, price, content);
    if (!ProductregisterResult) {
      return res.json(false);
    } else {
      return res.json(true);
    }
  },
);
//구매자 로그인 후 모든 판매상품 게시
app.get('/products/selling', setHeader, async (req: Request, res: Response, next: NextFunction) => {
  const AllProductList = await productService.getAllProduct();
  return res.json(AllProductList);
});
app.post(
  '/product/buy',
  setHeader,
  parseBody,
  async (req: Request, res: Response, next: NextFunction) => {
    const {id, buyerEmail} = req.body;
    const productId = id;
    const buyer_Email = buyerEmail;
    const buyResult = await productService.buyProduct(productId, buyer_Email);
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
  },
);
//buyer의 구매목록
app.get(
  '/product/shopping-list',
  setHeader,
  async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.query as {email: string};
    const buyerEmail = email;
    const buyerProductList = await productService.getBuyerProductsByEmail(buyerEmail);
    return res.json(buyerProductList);
  },
);
app.listen(parseInt(process.env.PORT ?? '3000'), () => {
  console.log('Server listenning on port:3000');
});
