import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

  employeeForm :any;
  isEditEid :any;
  isEdit = false;
  isEditData :any;
  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.loadEmployeeForm();
    if(this.route.snapshot.params['eid']){
      this.isEdit = true;
      this.isEditEid = this.route.snapshot.params['eid'];
      this.getEmployeeDetail();
    }
  }

  loadEmployeeForm(){
    console.log('loadEmployeeForm');
    this.employeeForm = new FormGroup({
      fname : new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{2,15}$/)]),
      lname : new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{2,15}$/)]),
      mobile : new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      email : new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
      dept : new FormControl('', [Validators.required]),
      designation : new FormControl('', [Validators.required]),
      manager : new FormControl('', [Validators.required]),
      city : new FormControl('', [Validators.required]),
    })
  }

  getEmployeeDetail(){
    console.log('getEmployeeDetail');
    this.http.get(`http://localhost:3000/getemployee/${this.isEditEid}`).subscribe(response=>{
      console.log(response);
      if(response && Object(response).length == 1){
        this.isEditData = Object(response)[0];
        this.loadEmployeeDetail();
      }
    },
    err=>{
      console.log(err);
    })
  }

  loadEmployeeDetail(){
    console.log('loadEmployeeDetail');
    this.employeeForm.controls['fname'].setValue(this.isEditData.fname);
    this.employeeForm.controls['lname'].setValue(this.isEditData.lname);
    this.employeeForm.controls['mobile'].setValue(this.isEditData.mobile);
    this.employeeForm.controls['email'].setValue(this.isEditData.email);
    this.employeeForm.controls['dept'].setValue(this.isEditData.dept);
    this.employeeForm.controls['designation'].setValue(this.isEditData.designation);
    this.employeeForm.controls['manager'].setValue(this.isEditData.manager);
    this.employeeForm.controls['city'].setValue(this.isEditData.city);
  }

  resetEmployeeForm(){
    console.log('resetEmployeeForm');
    this.loadEmployeeForm();
  }

  submitEmployeeForm(){
    console.log('submitEmployeeForm');
    if(this.isEdit == false){
      this.addNewEmployee();
    }else{
      this.editNewEmployee();
    }
  }

  addNewEmployee(){
    console.log('addNewEmployee');
    let employee_data = {
      fname : this.employeeForm.value.fname,
      lname : this.employeeForm.value.lname,
      mobile : this.employeeForm.value.mobile,
      email : this.employeeForm.value.email,
      dept : this.employeeForm.value.dept,
      designation : this.employeeForm.value.designation,
      manager : this.employeeForm.value.manager,
      city : this.employeeForm.value.city,
    }
    this.http.post(`http://localhost:3000/addemployee`, employee_data).subscribe(response=>{
      console.log(response);
      this.router.navigate(['']);
    },
    err=>{
      console.log(err);
    })
  }

  editNewEmployee(){
    console.log('editNewEmployee');
    let employee_data = {
      fname : this.employeeForm.value.fname,
      lname : this.employeeForm.value.lname,
      mobile : this.employeeForm.value.mobile,
      email : this.employeeForm.value.email,
      dept : this.employeeForm.value.dept,
      designation : this.employeeForm.value.designation,
      manager : this.employeeForm.value.manager,
      city : this.employeeForm.value.city,
    }
    this.http.put(`http://localhost:3000/updateemployee/${this.isEditEid}`, employee_data).subscribe(response=>{
      console.log(response);
      this.router.navigate(['']);
    },
    err=>{
      console.log(err);
    })
  }

  validateNumber(event:any){
    console.log('validateNumber', event.key);
    let key = event.key;
    /* let regex = new RegExp(/^[0-9]$/);
    let status = regex.test(key); */
    let status = new RegExp(/^[0-9]$/).test(key);
    if(!status){
      this.employeeForm.controls['mobile'].setValue(this.employeeForm.value.mobile.replace(key, ''));
    }
  }
}
