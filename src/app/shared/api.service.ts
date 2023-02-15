import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postEmployee(data: any) {
    return this.http
      .post<any>(
        'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-pyrrt/endpoint/employee',
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getEmployee() {
    return this.http
      .get<any>(
        'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-pyrrt/endpoint/employee'
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  updateEmployee(data: any, resourceName: any) {
    return this.http
      .put<any>(
        'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-pyrrt/endpoint/employee?resourceName=' +
        resourceName,
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  deleteEmployee(resourceName: any) {
    return this.http
      .delete<any>(
        'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-pyrrt/endpoint/employee?resourceName=' +
        resourceName
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
