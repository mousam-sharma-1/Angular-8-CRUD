import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { AppServiceService } from '../services/app-service.service';
import { Sdata } from '../services/sdata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-user',
  templateUrl: './log-user.component.html',
  styleUrls: ['./log-user.component.css']
})
export class LogUserComponent implements OnInit {
  myReactiveForm:FormGroup
//item=[]
  constructor(private appSer: AppServiceService,private router: Router,private formBuilder: FormBuilder) { }

  get f() { return this.myReactiveForm.controls; }

  onSubmit(form: NgForm) {
   // this.item.push(form.value)
console.log(this.myReactiveForm.value);
let SignData=this.myReactiveForm.value;
this.saveData(SignData);
this.myReactiveForm.reset();
}
saveData(data:Sdata){
this.appSer.saveSignValues(data).subscribe(
  (data : any)=> {
    if(data.status == 200) {
     console.log('successfully SIGNUP!',data.status);
   this.router.navigate(['/']);
    }
    else if(data.status == 400) {
      alert(data.message);
      console.log('user @lready registered !!');    
    }
  }
)
}
abc(){
window.open("https://google.com");
}
  ngOnInit() {
    this.myReactiveForm= this.formBuilder.group({
      'name': ['', Validators.required],
      'number1': ['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
      'cpassword':['', Validators.required],
    },
    {validator: this.MatchPass('password', 'cpassword')}
    );
  }

MatchPass(controlName:string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls['password'];
    const matchingControl = formGroup.controls['cpassword'];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
    } else {
        matchingControl.setErrors(null);
    }
}
}
}