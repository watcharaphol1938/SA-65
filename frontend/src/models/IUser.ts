import { GendersInterface } from "./IGender";
import { PrefixesInterface } from "./IPrefixes";
import { ProvincesInterface } from "./IProvince";
import { EmployeesInterface } from "./IEmployee";

export interface UsersInterface {
    ID: string,
    
    NamePrefixID: number
    NamePrefix: PrefixesInterface
    FirstName: string;
    LastName: string;
    EmployeeID: number
    Employee: EmployeesInterface
    Identification: string
    Email: string;
    Password: string
    BirthDay: Date | null;
    GenderID: number
    Gender: GendersInterface
    Mobile: string
    Address: string
    ProvinceID: number
    Province: ProvincesInterface
}   