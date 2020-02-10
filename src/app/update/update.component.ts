import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { AppServiceService } from '../services/app-service.service';
import { Sdata } from '../services/sdata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  myReactiveFormUP:FormGroup
  constructor(private appSer: AppServiceService,private router: Router,private formBuilder: FormBuilder) { }

  get f() { return this.myReactiveFormUP.controls; }

  onSubmit(form: NgForm) {
   // this.item.push(form.value)
console.log(this.myReactiveFormUP.value);
let SignData=this.myReactiveFormUP.value;
//this.saveData(SignData);
this.myReactiveFormUP.reset();
}

ngOnInit() {
  this.myReactiveFormUP= this.formBuilder.group({
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
