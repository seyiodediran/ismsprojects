import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: true }) //nullable just in case it is not allocated from the very beginning.
  employeeNumber: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  jobPosition: string;

  @Column({ nullable: true })
  jobTitle: string;

  @Column({ nullable: true })
  photo: string;

  @Column()
  departmentId: number;

  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ nullable: true })
  userId: number;

  @OneToOne(() => User, (user) => user.employee, {
    cascade: true // once an employee is created or deleted we can through it, create or delete a user

  })
  @JoinColumn({ name: 'userId' })
  user: User
}




/**
 * Questions
 * 
 * isn't user superior to employee in the application?
 * for instance an employee is also a user of the system
 * but a user doesn't neccesarily have to be an employee, the user could be a customer
 * also an employee could be removed from the system but still be a user(a customer)
 */