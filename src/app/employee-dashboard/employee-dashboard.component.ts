import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: any;
  showUpdate!: any;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      resourceName: [''],
      jobCode: [''],
      taskDescription: [''],
      status: [''],
    });
    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.resourceName = this.formValue.value.resourceName;
    this.employeeModelObj.jobCode = this.formValue.value.jobCode;
    this.employeeModelObj.taskDescription = this.formValue.value.taskDescription;
    this.employeeModelObj.status = this.formValue.value.status;
    this.api.postEmployee(this.employeeModelObj).subscribe(
      (res) => {
        console.log(res);
        let close = document.getElementById('cancel');
        close?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (err) => {
        alert('something wrong');
      }
    );
  }
  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }
  deleteEmployees(emp: any) {
    this.api.deleteEmployee(emp.resourceName).subscribe((res) => {
      this.getAllEmployee();
    });
  }

  onEdit(emp: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.formValue.controls['resourceName'].setValue(emp.resourceName);
    this.formValue.controls['jobCode'].setValue(emp.jobCode);
    this.formValue.controls['taskDescription'].setValue(emp.taskDescription);
    this.formValue.controls['status'].setValue(emp.status);
  }
  updateEmployeeDetails() {
    this.employeeModelObj.resourceName = this.formValue.value.resourceName;
    this.employeeModelObj.jobCode = this.formValue.value.jobCode;
    this.employeeModelObj.taskDescription = this.formValue.value.taskDescription;
    this.employeeModelObj.status = this.formValue.value.status;
    this.api
      .updateEmployee(this.employeeModelObj, this.employeeModelObj.resourceName)
      .subscribe((res) => {
        let close = document.getElementById('cancel');
        close?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }
}
