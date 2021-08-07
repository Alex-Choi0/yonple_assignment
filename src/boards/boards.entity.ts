import * as moment from 'moment';
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Board {
    // pk number 생성
    @PrimaryGeneratedColumn()
    id: number;

    // 컬럼 생성 : userId
    @Column({nullable:false})
    userId: number;

    // 컬럼 생성 : title
    @Column({nullable:false})
    title: string;

    // 컬럼 생성 : content
    @Column({nullable:true})
    content: string;

    // 컬럼 생성 : like
    @Column({nullable:false, default: 0})
    like: number;

    // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    // createdAt: Date;

    @Column({
        nullable:false
    })
    createdAt: string = moment().utc().toISOString();

    @ManyToOne(() => User, user => user.id)
    user : User;
}
