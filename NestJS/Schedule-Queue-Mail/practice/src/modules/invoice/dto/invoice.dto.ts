import { IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  dueDate: Date;

  @IsNotEmpty()
  userId: number;
}
