import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private bearer: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.bearer = authService.getToken();
  }

  /**
   * Gets all Employees from Service
   * 
   * @returns Employees array as Observable
   */
  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/backend/employees', {
      headers: this.getHeaders()
    });
  }

  /**
   * Gets asynchronously an employee by its id.
   * 
   * @param id of the employee
   * @returns employee as promise
   */
  public async getEmployeeById(id: number): Promise<Employee> {
    return await firstValueFrom(this.http.get<Employee>(`/backend/employees/${id}`, {
      headers: this.getHeaders()
    }));
  }

  /**
   * Adds asynchronously an employee.
   * 
   * @param employee object to add
   * @returns employee callback as promise
   */
  public async addEmployee(employee: Employee): Promise<Employee> {
    return firstValueFrom(this.http.post('/backend/employees', employee, {headers: this.getHeaders()}))
  }

  /**
   * Edits asynchronously an employee object.
   * 
   * @param employee to edit with matching id
   * @returns employee callback as promise
   */
  public async editEmployee(employee: Employee): Promise<Employee> {
    return firstValueFrom(this.http.put(`/backend/employees/${employee.id}`, employee, {headers: this.getHeaders()}))
  }

  /**
   * Deletes Employees of an array that have an undefined id.
   * 
   * @param employees in an array
   */
  public bulkDeleteEmployees(employees: Employee[]) {
    employees
    .forEach(employee => {
      if (employee.id != undefined) {
        this.deleteEmployee(employee.id)
      }
    })
  }

  /**
   * Deletes an employee by its id
   * 
   * @param Employee to delete
   */
  public async deleteEmployee(id: number) {
    await firstValueFrom(this.http.delete(`/backend/employees/${id}`, {headers: this.getHeaders()}))
  }

  /**
   * Gets required Headers for Employee related requests
   * 
   * @returns headers for requests
   */
  private getHeaders(): HttpHeaders | { [header: string]: string | string[]; } | undefined {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.bearer}`);
  }
}
