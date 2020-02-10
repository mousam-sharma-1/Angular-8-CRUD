import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppServiceService } from '../services/app-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//item=[];
  constructor(private appSer: AppServiceService,private router: Router) { }
  myReactiveFormL:FormGroup
  onSubmit(form: NgForm) {
  //  this.item.push(form.value)
console.log(this.myReactiveFormL);
let LogData=this.myReactiveFormL.value;
this.logData(LogData);
this.myReactiveFormL.reset();
}
logData(data){
  this.appSer.getLogValues(data).subscribe(
    (data : any)=> {
      if(data.status == 200) {
       console.log('successfully saved!',data.status);
       console.log(data.data);
     this.router.navigate(['/']);
      }
      else if(data.status == 400) {
        console.log('Not Registered!!');
        alert("WRONG ID/PASSWORD");
      //  this.router.navigate(['/']);
      }
    }
  )
}

  ngOnInit() {
    this.myReactiveFormL= new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,Validators.required),
    });
  }

}
