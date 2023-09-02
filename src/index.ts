import User from './user/user';
import Seller from './user/seller';
import Buyer from './user/buyer';
import Product from './product/product';

let n: number = 1; //구매할때 몇번째 시도인지 알려줌
const total: number = 5; //전체물건개수
const price: number = 10000; //물건가격저장
const stuff: Product[] = Array(5); //창고에 재고가 5개
const a = new Seller('x@gmail.com', '1234', 'x', 0, 'aaa'); //판매자 new

for (let i = 0; i < total; i++) {
  stuff[i] = new Product(price); //물건가격할당
}

const b = new Buyer('y@gmail.com', '1234', 'x', 10000, 'bbb'); //구매자 new

let num_stuff = 5; //구매자가 구매할 물건개수저장
function f(): void {
  //함수구현: 구매가능여부 확인후 구매
  if (price * num_stuff > b.getMoney()) {
    console.log(`${n}:잔액부족으로 물건을 구매할 수 없습니다.`);
  } else {
    console.log(`${n}:물건을 ${num_stuff}개 구매하였습니다.`);
    for (var i = 1; i <= num_stuff; i++) {
      b.BUY(price, stuff[total - i].getproductId()); //구매자는 물건의 productId를 history에 저장, 돈을 withdraw
      a.SELL(price, stuff[total - i].getproductId()); //판매자는 물건의 productId를 storage에 저장, 돈을 deposit
      stuff[total - i].setproductId_zero(); //창고에 재고가 1개씩 없어짐
    }
  }
  n++;
}
f(); //num_stuff가 5일때
num_stuff = 1; //구매자가 구매할 물건개수
f(); //num_stuff가 1일때

b.Print_history(num_stuff); //구매자의 구매한 물건상세정보
