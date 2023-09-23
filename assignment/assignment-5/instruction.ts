// 아래의 이론을 충분히 반영해서 지난번 과제를 업데이트 하세요
// 모든 변수의 이름에 충분한 의미를 담아서 추상성이 잘 반영되도록 작성하세요
// 함수의 파라미터와 리턴, 객체에 대해서 타입과 인터페이스를 정의하고 사용하세요
// 리포지토리에서 도메인 객체를 만들고 서비스에서 사용할 수 있게 리턴해 주세요
// 판매자 타입의 유저가 상품 하나를 추가할 수 있도록 코드를 작성해주세요
// 상품을 추가하면 다시 메인 화면으로 돌아가야 해요  
// 판매자의 메인 화면은 자신이 등록한 모든 상품 목록을 보여줘야 해요
//============================================================
// 서비스는 UI 레이어의 요청을 들어주는 레이어에요
// 요청을 들어준다는 뜻은 데이터를 찾고, 변경하고, 가공해서 UI에 돌려준다는 뜻이에요

// 데이터를 찾고 변경하고 가공하는 일은 데이터의 종류가 많으면 복잡해지기 때문에 데이터를 객체로 다루는게 좋겠죠?
// 바로 그 객체가 도메인객체에요

// 즉 서비스 레이어는 도메인 객체를 활용해서 데이터를 다뤄요
// 그럼 일단 도메인 객체가 있어야 하는데, 그 도메인 객체 내부에 어떤 데이터가 세팅되어야 하는지는 전부 CSV에 저장되어 있잖아요
// 그래서 CSV로 저장된 데이터를 도메인객체 형태로 변경해야 하는데 이걸 리포지토리 레이어가 책임지는 구조에요
//============================================================
// Object Oriented Programming(OOP)
// 개발자는 함수, 객체, 레이어의 상호작용으로 인한 데이터의 변화를 다루는 일을 합니다
// 함수, 객체, 레이어는 각각 자신이 책임지고 관리하는 데이터들을 가지고 있는 주체입니다
// 이들이 서로 상호작용할 때 너무 강한 결합도를 가지고 있으면 개발 속도, 의존성, 확장성과 같은 문제점들이 생겨납니다
// 이러한 문제를 해결하기 위해서는 의존하고 있는 주체들끼리의 결합도를 낮춰야 하며, 이를 위해 명세서를 활용합니다
// 명세서의 대표적인 예시로 타입과 인터페이스가 있으며, 이외에도 다양한 형태로 이를 활용할 수 있습니다
