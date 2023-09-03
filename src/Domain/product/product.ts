export default class Product {
  private static autoIncrementNumber: number = 0;
  private productId: any;
  private title: string = '타입스크립트';
  private price: number;
  private content: string = '도서';
  private sellerId: string = 'cuppang';

  constructor(price: number) {
    this.productId = 'sss_product_' + Product.autoIncrementNumber++;
    this.price = price;
  }
  //구매자가 물건을 사면 창고에 물거이 없어지므로 productId를 null로 만든다.
  public setproductId_zero() {
    this.productId = null;
  }
  public getproductId() {
    return this.productId;
  }

  public getPrice() {
    return this.price;
  }

  static description() {
    console.log('상품종류: 도서');
    console.log('상품이름: 타입스크립트');
    console.log('판매자: cuppang');
  }
}
