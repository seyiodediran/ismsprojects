import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    photo: string; //photo file location. Use stream to send

    @Column({ nullable: true })
    photoMimeType: string; //save the encoding of uploaded file for content-type use for reply.type as shown above

}
