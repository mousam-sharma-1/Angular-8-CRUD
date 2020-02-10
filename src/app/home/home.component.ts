import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';
import { Router } from '@angular/router';
import  Swal  from 'sweetalert2'
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
// import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myReactiveFormAU:FormGroup
  dataShow: any;
  public loading = true;


  constructor(private appSer: AppServiceService,private router: Router,private formBuilder: FormBuilder) { }

  get f() { return this.myReactiveFormAU.controls; }

up(data){
  console.log("UPDATE ",data);
  this.appSer.updateValues(data).subscribe(
    (data : any)=> {
      if(data.status == 200) {
       console.log('UPDATE!',data.status,data);
     this.router.navigate(['/update']);
      }
      else if(data.status == 400) {
        console.log('Not DELETED !!');
      }
    }
  )
}



del(data,i){
  console.log("INDEX : ",i);
  console.log("DELETE : ",data);   
  Swal.fire({
    title: 'Are You Sure!',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.value) {
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  this.dataShow.splice(i,1);
                                                                                              //deleteValues
  this.appSer.deleteValues(data).subscribe(
    (data : any)=> {
      if(data.status == 200) {
       console.log('DELETED!',data.status);
       this.router.navigate(['/']);
      //  this.dataShow = data.data;
      //  console.log('this.dataShow', this.dataShow);
       
      // document.getElementById('disp').innerHTML=data;
      }
      else if(data.status == 400) {
        console.log('Not DELETED !!');
        //alert("WRONG ID/PASSWORD");
      }
    }
  )
}
})   
}

demo() {
  console.log('demo called');
  
}

// addUserForm(){
//   console.log("yoyo");
//   // Swal.fire({
//   //   title: '<strong>FORM</strong>',
//   //   html:
//   //   '<form [formGroup]= "myReactiveFormAU" (ngSubmit) = "onSubmit(myformAU)">'+
//   //   '<div class="form-group">'+
//   //   '<label for="usr">Name:</label>'+
//   //   '<input type="text" class="form-control">'+
//   //   '</div>'+
//   //   '<div class="form-group">'+
//   //   '<label for="usr">Number:</label>'+
//   //   '<input type="text" class="form-control">'+
//   //   '</div>'+
//   //   '<div class="form-group">'+
//   //   '<label for="usr">Email:</label>'+
//   //   '<input type="text" class="form-control">'+
//   //   '</div>'+
//   //   '<div class="form-group">'+
//   //   '<label for="pwd">Password:</label>'+
//   //   '<input type="password" class="form-control">'+
//   //   '</div>'+
//   //   '<div class="form-group">'+
//   //   '<label for="pwd">Confirm Password:</label>'+
//   //   '<input type="password" class="form-control">'+
//   //   '</div>'+
//   //   '</form>',
//   //   showCloseButton: true,
//   //   focusConfirm: false,
//   //   confirmButtonText:
//   //     '<i class="fa fa-thumbs-up"></i> ADD!',
//   //   confirmButtonAriaLabel: 'Thumbs up, ADD!',
//   // })
  
// }

  getHomeData(data){
    this.loading = true;
    this.appSer.getTableValues(data).subscribe(
      (data : any)=> {
        if(data.status == 200) {
         console.log('successfully GOT!',data.status,data);
         this.dataShow = data.data;
         this.loading = false;
       //  console.log('this.dataShow', this.dataShow);
         
        // document.getElementById('disp').innerHTML=data;
        }
        else if(data.status == 400) {
          console.log('Not Able to get DATA!!');
         this.loading = false;
          alert("ERR@R!!");
        }
      }
    )
  }


  ngOnInit() {
    // console.log(localStorage.getItem('user'));
    this.getHomeData(null);
    this.myReactiveFormAU= this.formBuilder.group({
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

  onSubmit(form: NgForm) {
    // this.item.push(form.value)
 console.log(this.myReactiveFormAU.value);
 //let SignData=this.myReactiveFormAU.value;
 //this.saveData(SignData);
 this.myReactiveFormAU.reset();
 }


}
