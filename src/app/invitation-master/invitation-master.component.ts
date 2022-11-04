import { AttendenceComponent } from './../attendence/attendence.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../service.service';



@Component({
  selector: 'app-invitation-master',
  templateUrl: './invitation-master.component.html',
  styleUrls: ['./invitation-master.component.scss']
})
export class InvitationMasterComponent implements AfterViewInit,OnInit {
  Invitation: any;
  Attendees: any;
  InvitationID: any;

  displayedColumns: string[] = ['position', 'Name', 'Email', 'Status'];
  public dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(public dialog: MatDialog,private service: ServiceService) {
    //this.dataSource.data = this.PeriodicElement;
  }

  PeriodicElement = [
    { position: 1, Name: '', Email: '', Status: '' },
  ];



  ngOnInit(): void {
    this.Get_Invitation();
    this.Get_Attendees();

  }


  add() {
    const dialogRef = this.dialog.open(AttendenceComponent,
      {
        height: '70%',
        width: '55%',
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == 'Add') {
        this.Get_Attendees();
      }
      
      
    });
  }
  Get_Invitation() {
    this.service.Get_InvitationMaster()
      .subscribe((data) => {
        this.Invitation = data
      })
  }
  Get_Attendees() {
    this.service.Get_Attendees()
      .subscribe((data) => {
        this.Attendees = data
        console.log(this.Attendees);
        this.dataSource = new MatTableDataSource(this.Attendees);
        this.dataSource.paginator = this.paginator;
      })
  }
  Attendee_Data(data:any) {
    console.log('Attendee_Data', data)
    this.service.Get_AttendeesByInvitationID(data)
      .subscribe((data) => {
        this.Attendees = data
        console.log(this.Attendees);
        this.dataSource = new MatTableDataSource(this.Attendees);
        this.dataSource.paginator = this.paginator;
      })
  }
}
