import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    location: string;

    @OneToMany(() => Employee, employee=>employee.department)
    employees: Employee[];

    
}