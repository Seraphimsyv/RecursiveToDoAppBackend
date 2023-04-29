import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  status: 0 | 1 | 2;

  @Column()
  description: string;

  @Column({ nullable: true })
  parentId?: number;

  @Column({ nullable: true })
  place: number;
}