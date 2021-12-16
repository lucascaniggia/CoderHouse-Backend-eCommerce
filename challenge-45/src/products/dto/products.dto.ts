import { IsNotEmpty, IsNumber, IsUrl, Length, Max } from 'class-validator';

export class ProductDTO {
  readonly id: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  @Length(14, 14)
  readonly code: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(5000)
  readonly price: number;

  @IsNotEmpty()
  readonly category: string;

  @IsNotEmpty()
  @IsUrl()
  readonly photo: string;

  readonly timestamp: string;

  @IsNotEmpty()
  @IsNumber()
  readonly stock: number;
}