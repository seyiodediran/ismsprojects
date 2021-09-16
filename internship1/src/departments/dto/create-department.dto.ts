import { CountryList } from "src/global/app.enum";

export class CreateDepartmentDto {
  readonly name: string;
  readonly description?: string;
  readonly location: CountryList;
}
