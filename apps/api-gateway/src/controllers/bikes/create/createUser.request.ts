import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBikeRequest {
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string' })
    branch: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', enum: ['Admin', 'Cyclist'] })
    type: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string' })
    color: string;
  }