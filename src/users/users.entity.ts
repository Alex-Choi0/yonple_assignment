import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    // pk number 생성
    @PrimaryGeneratedColumn()
    id: number;

    // 컬럼 생성 : email
    @Column({nullable:false})
    email: string;

    // 컬럼 생성 : nicknam
    @Column({nullable:false, length: 10})
    nickname: string;

    // 컬럼 생성 : password
    @Column()
    password: string;

}
