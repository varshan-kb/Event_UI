import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../service.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent implements OnInit {
  

  AttendenceForm: FormGroup;
  data: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private formBuilder: FormBuilder, private service: ServiceService, public dialogRef: MatDialogRef<AttendenceComponent>) {
    this.dataSource.data = this.PeriodicElement;
    this.AttendenceForm = this.formBuilder.group({
      'InvitationID': ['', [Validators.required]],
      'Name': ['', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.minLength(1), Validators.required, this.nameValidatorss]],
      'Email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      'Status': ['', [Validators.required]],
    });
  }
  
  PeriodicElement = [
    { position: 1, AppoinmentNo: '', AppoinmentDate: '', AppoinmentSchedule: '', DoctorName: '', AppoinmentType: '', Status: '' },
  ];

  displayedColumns: string[] = ['position', 'Appoinment No', 'Appoinment Date', 'Appoinment Schedule', 'Doctor Name', 'Appoinment Type', 'Status'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.InvitationMaster()
   
  }
  Attendence() {
    this.service.Add_Attendees(this.AttendenceForm.value)
      .subscribe((res) => {
        console.log(res);
        if (res == true) {
          this.dialogRef.close('Add');
        }

      })
  }
  InvitationMaster() {
    this.service.Get_InvitationMaster()
      .subscribe((res) => {
        this.data = res;
        console.log('IM', res);
        
      })
  }

  nameValidator(control: any): any {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\s/g,''/a-zA-Z]/;
    // const spaceexp: RegExp =/[/\s/g, '']/

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }
  nameValidators(control: any):any {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;
    // const spaceexp: RegExp =/[/\s/g, '']/

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }

  nameValidatorss(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;
    // const spaceexp: RegExp =/[/\s/g, '']/
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
    else {
      return {};
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.AttendenceForm.controls[controlName].hasError(errorName);
  }
  get officialEmail() {
    return this.AttendenceForm.get('Email');
  }



}
