import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin,dayGridPlugin],
    initialView: 'timeGridWeek',
    height:500,
    themeSystem:'bootstrap5',
    aspectRatio:16,
    headerToolbar: {
      center: 'prev,title,next',
      right: 'timeGridWeek,timeGridDay,dayGridMonth' // user can switch between the two
    },
    
    weekNumbers: true,
    dayMaxEvents: true, // allow "more" link when too many events
    
    selectable: true,
    selectMirror:true,
  };
}
