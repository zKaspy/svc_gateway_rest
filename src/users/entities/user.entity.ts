import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty({required: false})
    id: number;
  
    @ApiProperty({description: "Имя"})
    name: string;
  
    @ApiProperty({description: "Возраст"})
    age: number;
}
