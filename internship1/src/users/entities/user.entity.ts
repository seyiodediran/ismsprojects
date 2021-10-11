import { Department } from 'src/departments/entities/department.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { CountryList, Gender } from 'src/global/app.enum';
import { Role } from 'src/roles/entities/role.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; // since it is a generated field we wouldnt add it to the dto

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  commonName: string;

  @Column({ nullable: true })
  homeAddress: string;

  @Column({ type: 'enum', enum: Gender, nullable: true }) //nullable because of Social Auth possibility of not getting it
  gender: Gender;

  @Column({ nullable: true }) //nullable because of Social Auth possibility of not getting it
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: CountryList, nullable: true })
  nationality: CountryList;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  county: string;

  @Column({ nullable: true })
  zip: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isSoftDeleted: boolean;

  @Column({ unique: true })
  @Index()
  primaryEmailAddress: string;

  @Column({ nullable: true })
  backupEmailAddress: string;

  @Column('simple-json', { nullable: true })
  phone: { mobile: string[]; office: string[]; home: string[] };

  @Column({ default: false })
  isPrimaryEmailAddressVerified: boolean;

  @Column({ default: false })
  isBackupEmailAddressVerified: boolean;

  @Column({ select: false }) //don't select password whenever user is called. See https://typeorm.io/#/select-query-builder/hidden-columns
  passwordHash: string;

  //set to true if password change is required
  @Column({ default: false })
  isPasswordChangeRequired: boolean;

  //token to be generated when password change request is made
  @Column({ unique: true, nullable: true, select: false })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordExpiration: Date;

  @Column({ nullable: true, select: false })
  primaryEmailVerificationToken: string;

  @Column({ nullable: true, select: false })
  backupEmailVerificationToken: string;

  @Column({ nullable: true })
  emailVerificationTokenExpiration: Date;

  //Incorporating OTP. See https://github.com/speakeasyjs/speakeasy
  @Column({ default: false })
  otpEnabled: boolean;

  @Column({ nullable: true, select: false })
  otpSecret: string;

  // for refresh token save after successful login/
  @Column({ select: false, nullable: true })
  refreshTokenHash: string;

  @Column({nullable: true})
  employeeId: number;

  @OneToOne(() => Employee)
  @JoinColumn({name: 'employeeId'})
  employee: Employee;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user, {
    cascade: true,
  })
  userProfile: UserProfile;

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne(() => Department, (department) => department.users, {
    cascade: true,
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];
}
