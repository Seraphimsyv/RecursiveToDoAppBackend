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

  @Column()
  parentId?: number;

  @Column()
  place: number;
}