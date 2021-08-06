import { EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';

// User entity를 불러서 DB의 테이블 생성
@EntityRepository(User)
export class UserRepository extends Repository<User> {

}
