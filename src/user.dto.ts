import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    userId: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    age: number;
    @ApiProperty()
    salary: number;
    @ApiProperty()
    company: string;
}