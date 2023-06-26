import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    userId: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    enroll: string;
    @ApiProperty()
    admission: string;
}