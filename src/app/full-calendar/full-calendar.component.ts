import { Component } from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent {
  calendarOptions!: CalendarOptions;
  calendar!: Calendar;

  ngOnInit() {
    this.calendarOptions = {
      editable: true, // Enable dragging and resizing of events
      events: 'https://fullcalendar.io/api/demo-feeds/events.json?overload-day',
      eventColor: '#0FAF9B',
      plugins: [timeGridPlugin, dayGridPlugin,interactionPlugin],
      initialView: 'timeGridWeek',
      height: 700,
      aspectRatio: 16,
      headerToolbar: {
        left: 'Planning',
        center: 'prev,title,next',
        right: 'dayGridMonth,timeGridWeek,addEventButton'
      },
      weekNumbers: false,
      dayMaxEvents: true,
      titleFormat: { month: 'long', year: 'numeric' },
      selectable: true,
      selectMirror: true,
      allDaySlot: false,
      dayHeaderFormat: { weekday: 'short', day: 'numeric' },
      viewDidMount: (args) => {
        const axisFrameDiv = document.querySelector('.fc-timegrid-axis-frame') as HTMLElement;
        if (axisFrameDiv) {
          axisFrameDiv.innerHTML = '<div class="custom-content">Employee</div>';
        }
        const headerToolbar = document.querySelector('.fc-toolbar-chunk') as HTMLElement;
        if(headerToolbar){
          headerToolbar.insertAdjacentHTML('afterbegin', '<div class="custom-content2">Planning</div>');
        }
        this.calendar = args.view.calendar as Calendar;
      },
      customButtons: {
        addEventButton: {
          text: 'add event...',
          click: () => {
            var dateStr = prompt('Enter a date in YYYY-MM-DD format');
            var date = new Date(dateStr + 'T00:00:00');

            if (!isNaN(date.valueOf())) {
              this.calendar.addEvent({
                title: 'dynamic event',
                start: date,
                allDay: true
              });
              alert('Great. Now, update your database...');
            } else {
              alert('Invalid date.');
            }
          }
        }
      }
      
    };
    
  }
}
