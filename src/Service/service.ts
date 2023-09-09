import Database from '../Database/database';

class Service {
  read = async (a: string, b: string) => {
    const db: Database = new Database();
    const readContents: any = await db.readCSV('users.csv');
    // 이메일 검사
    if (b === 'e') {
      //이메일이 일치할때
      let flag: number = 0;
      for (let i = 0; i < readContents.length; i++) {
        if (a === readContents[i].email) {
          flag = 1;
          return;
        }
      }
      //이메일이 일치하지 않을때
      return 'not-email';
    }
    // password 검사
    else if (b === 'p') {
      let flag: number = 0;
      let num: number = 0;
      // password가 일치할때
      for (let i = 0; i < readContents.length; i++) {
        if (a === readContents[i].password) {
          flag = 1;
          return readContents[i];
        }
      }
      // password가 일치하지 않을때
      if (flag === 0) {
        return 'not-password';
      }
    }
  };

  write = async (a: any) => {
    const db: Database = new Database();
    await db.writeCSV(
      'users.csv',
      `${a.email},${a.password},${a.nickname},${a.money},${a.usertype}`,
    );
  };
}
export default Service;
