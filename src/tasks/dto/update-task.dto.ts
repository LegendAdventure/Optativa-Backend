import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class UpdateTaskDto {
@IsString()
@IsOptional()
descriptionTask?: string;
@IsBoolean()
@IsOptional()
completedTask?: boolean;
}