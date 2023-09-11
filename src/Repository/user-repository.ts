import Database from '../Database/database';

class UserRepository {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  findUserByEmail = async (email: string) => {};
}

export default UserRepository;
