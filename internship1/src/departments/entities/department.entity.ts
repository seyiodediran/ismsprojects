import { Employee } from "src/employees/entities/employee.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    location: string;

    @OneToMany(() => Employee, employee=>employee.department)
    employees: Employee[];

    @OneToMany(() => User, user => user.department)
    users: User[]

    
}