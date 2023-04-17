import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  status: "toDo" | "inProgress" | "done";

  @Column()
  description: string;

  @Column({ nullable: true })
  parentId?: number;

  @Column({ nullable: true })
  place: number;
}