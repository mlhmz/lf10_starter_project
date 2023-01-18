import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | undefined;
  id: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
  ) {
  }

  ngOnInit(): void {
    this.getIdFromParams();
    if (this.id != undefined) {
      this.fetchEmployee(this.id);
    }
  }

  isEmployeeAvailable() {
    return this.employee != undefined;
  }

  private getIdFromParams() {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
  }

  private fetchEmployee(id: number) {
    this.employeeService.getEmployeeById(id)
      .subscribe((employee: Employee) => this.employee = employee);
  }
}
