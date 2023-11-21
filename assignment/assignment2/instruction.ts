// User 클래스를 참고해서 코드를 완성하세요
// 필요한 속성이 있다고 판단되면 추가하세요(부족한 속성이 반드시 있습니다)
// 필요한 메소드가 있다고 판단되면 구현하세요(미구현된 메소드가 반드시 있습니다)
// 모든 속성은 private, 모든 메소드는 public으로 구현하세요
// Buyer, Seller 클래스는 User 클래스를 상속받고 있어요
// Buyer 클래스는 history 속성을 가지고 있어요
// history는 내가 구매한 product의 productId가 들어있는 배열이에요
// Seller 클래스는 storage 속성을 가지고 있어요
// storage는 내가 판매할 product의 productId가 들어있는 배열이에요
// Product 클래스는 productId, title, price, content, sellerId 속성을 가지고 있어요
// productId는 Product 객체를 식별하는 고유한 숫자에요
// productId는 Product 객체가 생성될 때마다 값이 1씩 증가해요
// index.ts 파일에서 다음을 실행하세요
// 1. 1개당 10000원인 임의의 product 5개를 담고 있는 products 배열을 생성하세요
// 2. seller를 생성하세요. 초기 잔액은 0원입니다
// 3. seller는 5개의 productId를 자신의 storage에 저장합니다
// 4. buyer를 생성하세요. 초기 잔액은 10000원입니다
// 5. buyer가 seller의 product 5개를 모두 구매하세요
// 6. 잔액 부족으로 구매가 실패해야 합니다
// 7. buyer가 seller의 prouct 1개를 구매하세요
// 8. seller의 storage에서 productId가 1개 사라집니다
// 9. seller의 money가 늘어납니다
// 10. buyer의 purchases에 productId가 추가됩니다
// 11. buyer의 money가 줄어듭니다
// 12. buyer가 history에 담겨있는 productId를 활용해서 product의 이름, 가격, 상세 정보를 출력합니다

// Object Oriented Programming(oop)
// 프로그래밍: 데이터의 변화를 다루는 일
// 문제점: 데이터의 관계가 너무 복잡해지면 변화의 흐름을 파악하기 어렵다
// 해결책: 객체 지향 프로그래밍
// 객체지향 프로그래밍의 4대 원칙
// 1. 추상화: 객체 사용자는 클래스 내부 로직을 몰라도 객체를 편리하게 사용할 수 있도록 클래스를 잘 설계해야 한다
// 2. 캡슐화: 속성을 감추고 메소드로만 속성을 변경한다
// 3. 상속: 공통된 속성과 메소드는 중복을 피하기 위해 부모 클래스를 활용한다
// 4. 다형성: 확장성을 위해 이름은 같지만 내부 로직은 다르게 구현한다
