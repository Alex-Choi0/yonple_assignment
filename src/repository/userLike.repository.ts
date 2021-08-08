import { EntityRepository, Repository } from 'typeorm';
import { Like } from '../entity/userLike.entity';
require('dotenv').config()

// Like entity를 불러서 DB의 테이블 생성
@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {

}
