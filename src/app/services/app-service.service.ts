import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { Observable } from 'rxjs';
import { Sdata } from './sdata';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  Surl: '/signup'

  constructor(private http: HttpClient) { }



  // saveSignValues(data: any) {
  //   console.log(data);
  //   // return this.http.post<Sdata>(this.Surl,data,options)
  //   return this.http.post('http://localhost:3000/signup',data)
  // }


// Mysql with sequelize

  saveSignValues(data: any) {
    console.log(data);
    return this.http.post("http://localhost:3000/signup",data)
    // return this.http.post('http://localhost:3000/mysql/store',data)
  }

  getTableValues(data:any){
   // console.log(data);
    return this.http.get('http://localhost:3000/')
  }

  getLogValues(data:any){
    console.log(data);
    return this.http.post('http://localhost:3000/login',data)
  }

  deleteValues(data:any){
    console.log("data in service",data);
    return this.http.post('http://localhost:3000/delete',{id:data})
  }
  updateValues(data:any){
    console.log("updata in service",data);
   return this.http.post('http://localhost:3000/update',{id:data})
  // return null;
  }
}
