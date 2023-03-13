import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  displayColumns = ['eid', 'fullname', 'mobile', 'email', 'dept', 'designation', 'manager', 'city', 'action'];
  displayData :any = new MatTableDataSource([]);

  @ViewChild('table') table :any = ElementRef;
  @ViewChild(MatSort) sort:any = MatSort;

  constructor(private http:HttpClient, private router:Router) { 
    /* this.displayData = [
      {
        eid : 123,
        name : 'Sunilkumar',
        mobile : 1234
      },
      {
        eid : 124,
        name : 'Sushilkumar',
        mobile : 1234
      },
      {
        eid : 125,
        name : 'Ajaykumar',
        mobile : 1234
      },
      {
        eid : 123,
        name : 'Sunilkumar',
        mobile : 1234
      },
      {
        eid : 124,
        name : 'Sushilkumar',
        mobile : 1234
      },
      {
        eid : 125,
        name : 'Ajaykumar',
        mobile : 1234
      },
      {
        eid : 123,
        name : 'Sunilkumar',
        mobile : 1234
      },
      {
        eid : 124,
        name : 'Sushilkumar',
        mobile : 1234
      },
      {
        eid : 125,
        name : 'Ajaykumar',
        mobile : 1234
      }, {
        eid : 123,
        name : 'Sunilkumar',
        mobile : 1234
      },
      {
        eid : 124,
        name : 'Sushilkumar',
        mobile : 1234
      },
      {
        eid : 125,
        name : 'Ajaykumar',
        mobile : 1234
      }
    ] */
  }

  ngOnInit(): void {
    this.getEmployeesList();
  }

  getEmployeesList(){
    this.http.get(`http://localhost:3000/getemployeeslist`).subscribe(response => {
      console.log(response);
      if(response && Object(response).length > 0){
        let displayData = Object(response).map((item:any)=>{
          return {
            eid : item.eid,
            fname : item.fname,
            lname : item.lname,
            fullname : item.fname+' '+item.lname,
            mobile : item.mobile,
            email : item.email,
            dept : item.dept,
            designation : item.designation,
            manager : item.manager,
            city : item.city
          }
        })
        this.displayData.data = displayData;
        this.displayData.sort = this.sort;
      }else{
        this.displayData = [];
      }
    },
    err => {
      console.log(err);
    })
  }

  searchEmployee(event:any){
    console.log('searchEmployee', event.target.value);
    let search_text = event.target.value;
    this.displayData.filter = search_text;
  }

  editEmployee(emp_data:any){
    console.log('editEmployee');
    let eid = emp_data.eid;
    this.router.navigate([`/new-employee/${eid}`]);
  }

  deleteEmployee(emp_data:any){
    console.log('deleteEmployee');
    let eid = emp_data.eid;
    this.http.delete(`http://localhost:3000/deleteemployee/${eid}`).subscribe(response=>{
      console.log(response);
      this.getEmployeesList();
    },
    err=>{
      console.log(err);
    })
  }

  exportExcel(){
    console.log('exportExcel');
    
    const ws : XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
    XLSX.writeFile(wb, 'mytable.xlsx');
  }
}
