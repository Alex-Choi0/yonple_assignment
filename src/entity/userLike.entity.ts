import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Like {
    // joinTable pk number 생성
    @PrimaryGeneratedColumn()
    id: number;

    // user pk number 생성
    @Column({nullable:true})
    userId: number;

    // board pk number 생성
    @Column({nullable:true})
    boardId: number;

}
