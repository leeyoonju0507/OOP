// csv 파일을 읽기 위한 패키지가 package.json에 기록되어 있어요. npm install 명령어를 실행해서 설치해주세요
// UI, Service, Domain, Database 폴더에 필요한 클래스를 적절하게 생성하고 사용하세요
// Data 폴더에 csv 파일의 가장 첫 번째 줄은 csv 파일의 컬럼의 이름이에요. 필요한 컬럼이 있는 경우 직접 추가하세요
// index.ts에 inputReceiver 함수와 Database 클래스의 사용법을 정리해 두었어요
// store 앱을 실행하면 인증 스크린에서 로그인, 또는 회원가입 중 하나를 선택할 수 있어야 해요
// 회원가입을 선택하는 경우 회원가입 스크린에서 이메일, 비밀번호, 별명, 잔액, 유저의 타입(셀러, 바이어)을 입력받으세요
// 입력받은 정보에 문제가 없는 경우 csv 파일에 저장하세요
// 문제가 있는 경우 적절한 메세지를 보여주고 다시 인증 스크린을 보여주세요
// 입력받은 정보에 문제가 있는 경우는 아래와 같아요
// 1. 이미 이메일이 존재하는 경우
// 2. 잔액이 숫자가 아니거나 또는 음수인 경우
// 로그인을 선택하는 경우 로그인 스크린에서 이메일, 비밀번호를 입력받으세요
// 입력받은 정보에 문제가 없는 경우 유저의 별명, 유저의 타입, 유저의 잔액, 그리고 환영 메세지를 메인 스크린에 보여주세요
// 문제가 있는 경우 적절한 메세지를 보여주고 다시 인증 스크린을 보여주세요
// 입력받은 정보에 문제가 있는 경우는 아래와 같아요
// 1. 이메일이 없는 경우
// 2. 이메일이 있으나 비밀번호가 틀리는 경우

// Object Oriented Programming(OOP)
// 회사를 운영하는 것과 비슷한 전략으로 소프트웨어를 설계합니다
// 규모가 작은 회사라면 사업자 개인이 모든 일을 처리합니다
// 규모가 큰 회사라면 전문성을 가지는 직원 여러명을 고용하고 일을 위임합니다
// 규모가 더 큰 회사라면 전문성을 가지는 직원들로 모이는 부서를 만들고 실행 및 보고 체계를 만듭니다
// 이를 소프트웨어 설계에 비유하면 다음과 같습니다
// 규모가 작은 소프트웨어라면 하나의 메인 파일(index.ts)에서 모든 일을 처리합니다
// 규모가 큰 소프트웨어라면 클래스를 설계하고 전문성을 가지는 객체 여러개를 생성해서 일을 위임합니다
// 규모가 더 큰 소프트웨어라면 전문성을 가지는 객체들로 레이어를 만들고(UI, Service, Domain, Database) 레이어끼리의 실행 및 소통 체계를 만듭니다
