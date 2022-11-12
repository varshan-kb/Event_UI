import { AttendenceComponent } from './../attendence/attendence.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import * as Chart from 'chart.js';
//import { ChartConfiguration } from 'chart.js';



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
 
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  // public barChartData: ChartConfiguration<'bar'>['data'] = {
  //   labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  //   datasets: [
  //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  //   ]
  // };

  // public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  //   responsive: false,
  // };

  constructor(public dialog: MatDialog,private service: ServiceService) {
    //this.dataSource.data = this.PeriodicElement;
  }

  PeriodicElement = [
    { position: 1, Name: '', Email: '', Status: '' },
  ];



  ngOnInit(): void {
    this.Graph(0, 0, 0);
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
    this.Graph(0, 0, 0);
    this.service.Get_Attendees()
      .subscribe((data:any) => {
        console.log('out',data);
        this.dataSource = new MatTableDataSource(data.attendees);
        this.dataSource.paginator = this.paginator;
        this.Graph(data.attendingcount, data.maybecount, data.notattendingcount);
      })
  }
  Attendee_Data(data:any) {
    console.log('Attendee_Data', data)
    this.service.Get_AttendeesByInvitationID(data)
      .subscribe((data:any) => {
        console.log('out put', data);
        this.dataSource = new MatTableDataSource(data.attendees);
        this.dataSource.paginator = this.paginator;
        this.Graph(data.attendingcount, data.maybecount, data.notattendingcount);
      })
  }
  Graph(attending: number, maybe: number, notattending: number) {
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['Attending', 'May be', 'Not attending'],
        datasets: [{
          label: 'Attendees',
          data: [attending, maybe, notattending],
          backgroundColor: [
            // 'rgba(255, 99, 132, 0.2)',
            //'rgba(54, 162, 235, 0.2)',
            //'rgba(255, 206, 86, 0.2)',
            '#004C99',
            '#FFAF00',
            '#FF0000'
            //'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            // 'rgba(255, 99, 132, 1)',
            // 'rgba(54, 162, 235, 1)',
            //'rgba(255, 206, 86, 1)',
            '#004C99',
            '#FFAF00',
            '#FF0000'
            //'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              min: 0,
              max: 0
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 50
            }
            
          }]
        } 
      }
    });
    
  }
}
