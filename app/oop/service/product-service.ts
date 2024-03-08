import {IProductClient, IProductDomain, ProductDomain} from '../domain/product/product';
import Buyer from '../domain/user/buyer';
import Seller from '../domain/user/seller';
import Repository, {IRepository} from '../repository/repository';

export interface IProductService {
  registerProduct(email: string, title: string, price: number, content: string): Promise<boolean>;
  getSellerProducts(email: string): Promise<IProductClient[]>;
  // checkSoldOutfProduct(id: string): Promise<boolean>;
  buyProduct(id: string, buyerEmail: string): Promise<boolean>;
}

export default class ProductService implements IProductService {
  private repository: IRepository;

  constructor() {
    this.repository = Repository.getInstance();
  }

  registerProduct = async (email: string, title: string, price: number, content: string) => {
    //이 고객이 회원인지 아닌지 검사
    const checkIsMember = await this.repository.userRepository.findUserByEmail(email);
    if (!checkIsMember) {
      return false;
    }
    if (checkIsMember instanceof Buyer) {
      return false;
    }
    //상품을 등록하고 등록성공 여부 return
    await this.repository.productRepository.createProduct({
      title,
      content,
      price,
      sellerEmail: email,
      buyerEmail: 'null',
      IsSoldOut: false,
    });
    return true;
  };

  getSellerProducts = async (email: string) => {
    const seller = await this.repository.userRepository.findUserByEmail(email);
    if (!seller || seller instanceof Buyer) {
      return [];
    }

    const sellerProducts = await this.repository.productRepository.findProductsByEmail(
      'seller',
      email,
    );
    const productClients: IProductClient[] = [];
    for (let i = 0; i < sellerProducts.length; i++) {
      const product = sellerProducts[i];
      productClients.push({
        id: product.getProductId(),
        title: product.getTitle(),
        price: product.getPrice(),
        content: product.getContent(),
      });
    }
    return productClients;
  };
  // checkSoldOutfProduct = async (id: string) => {
  //   const ExistOfProduct = await this.repository.productRepository.getIsProductExist(id);
  //   if (!ExistOfProduct) {
  //     return false;
  //   }
  //   return true;
  // };

  buyProduct = async (id: string, buyerEmail: string) => {
    const buyer = await this.repository.userRepository.findUserByEmail(buyerEmail);
    if (!buyer) {
      return false;
    }
    const 구매하고싶은상품 = await this.repository.productRepository.checkProductSoldOut(id);
    if (!구매하고싶은상품) {
      return false;
    }
    // await this.repository.productRepository.updateProduct({
    //   id,
    //   buyerEmail,
    //   isSoldOut: true,
    // });
    // const  구매할상품 = {
    //   id: 구매하고싶은상품.id,
    //   title:구매하고싶은상품.title,
    //   content:구매하고싶은상품.content,
    //   price:구매하고싶은상품.price,
    //   sellerEmail:구매하고싶은상품.sellerEmail,
    //   buyerEmail,
    //   isSoldOut: true
    // } as IProductDomain
    const 구매할상품 = {
      id: 구매하고싶은상품.getProductId(),
      title: 구매하고싶은상품.getTitle(),
      content: 구매하고싶은상품.getContent(),
      price: 구매하고싶은상품.getPrice(),
      sellerEmail: 구매하고싶은상품.getSellerEmail(),
      buyerEmail,
      isSoldOut: true,
    } as IProductDomain;
    await this.repository.productRepository.updateProduct(구매할상품);
    return true;
  };
}
