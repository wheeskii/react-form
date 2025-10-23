import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// export const Course = {
//     IT: "Information Technology",
//     COMPSCI: "Computer Science"
// } as const;


export const Course = {
    IT: "Information Technology",
    COMPSCI: "Computer Science"
} as const;

type CourseType = typeof Course[keyof typeof Course];


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar",
    })
    lastName!: string;

    @Column({
        type: "varchar",
    })
    firstName!: string;

    @Column({
        type: "varchar",
    })
    middleName!: string;

    @Column({
        type: "varchar"
    })
    email!: string;

    @Column({
        type: "date"
    })
    birthdate!: Date;

    @Column({
        type: "varchar",
        length: 11,
        unique: true
    })
    phoneNumber!: string;

    @Column({
        type: "enum",
        enum: Object.values(Course),
        default: Course.COMPSCI,
    })
    course!: CourseType;

}