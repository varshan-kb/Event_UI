import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  
  Get_InvitationMaster() {
    return this.http.get(`${environment.API_Base_URL}` + `InvitationMaster/GetInvitation`)
  }
  Get_Attendees() {
    return this.http.get(`${environment.API_Base_URL}` + `Attendees/GetAttendees`)
  }
  Get_AttendeesByInvitationID(data:any) {
    return this.http.get(`${environment.API_Base_URL}` + `Attendees/GetAttendeesByInvitationID/` + data);
  }
  Add_Attendees(data:any) {
    return this.http.post(`${environment.API_Base_URL}` + `Attendees/AddAttendees`,data)
  }

  
}
