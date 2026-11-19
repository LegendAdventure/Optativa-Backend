import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ /* ... */ })
  @IsString()
  @IsNotEmpty()
  userFirstname!: string;

  // AQUÍ DEBE ESTAR: Revisa que el nombre sea exacto
  @ApiProperty({
    description: 'Apellidos del usuario',
    example: 'García',
  })
  @IsString()
  @IsNotEmpty()
  userSurname!: string; // <-- Debe llamarse exactamente así

  @ApiProperty({ /* ... */ })
  @IsString()
  @IsNotEmpty()
  userLogin!: string;

  @ApiProperty({ /* ... */ })
  @IsString()
  @IsNotEmpty()
  userPassword!: string;
}