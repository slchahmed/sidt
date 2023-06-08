import { Component } from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Draggable } from '@fullcalendar/interaction';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent {
  calendarOptions!: CalendarOptions;
  calendar!: Calendar;
  events:any =[
    {title:'Mohamed',date:'2023-06-07',color:'#F12E6D'},
    {title:'sidi',date:'2023-06-07',color:'#FD820B'},
    {title:'salem',date:'2023-06-07',color:'#DFF81E'},
    {title:'sidati',date:'2023-06-07',color:'#5EBAD9'},
    {title:'souleyman',date:'2023-06-07',color:'#8962F8'},
    {title:'acha',date:'2023-06-07',color:'#CC996D'},
    {title:'selemhe',date:'2023-06-07',color:'#525D49'},
  ]
  ngOnInit() {
    this.calendarOptions = {
      editable: true, // Enable dragging and resizing of events
      events:this.events,
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
      eventResize: function(arg) {
        const event = arg.event;
        const newStart = event.start;
      
        // Perform any necessary logic to update the start date
        // For example, add 1 day to the new start date
        const updatedStart = new Date(newStart!);
        updatedStart.setDate(updatedStart.getDate() + 1);
      
        // Update the event's start date
        event.setStart(updatedStart);
      
        // Perform any additional logic or update your data source
      },
      dayMaxEvents: true,
      titleFormat: { month: 'long', year: 'numeric' },
      selectable: true,
      selectMirror: true,
      allDaySlot: true,
      dayHeaderFormat: { weekday: 'short', day: 'numeric' },
      eventResizableFromStart: true, // Enable resizing from the start of the event
      viewDidMount: (args) => {
        const axisFrameDiv = document.querySelector('.fc-timegrid-axis-frame') as HTMLElement;
        if (axisFrameDiv) {
          axisFrameDiv.innerHTML = '<div class="custom-content">Employee</div>';
        }
        const namecol = document.querySelector('.fc-timegrid-axis-frame-liquid') as HTMLElement;
        if (namecol) {
          const existingContent = namecol.querySelector('.custom-content3');
      
          if (!existingContent) {
            namecol.innerHTML = `<div class="custom-content3">
              <table>
                <tr>
                  <td style="padding:20px"><span style="background-color:#F12E6D;color:#F12E6D">.</span>Mohamed</td>
                </tr>
                <tr>
                  <td style="padding:20px"><span style="background-color:#FD820B;color:#FD820B">.</span>Sidi</td>
                </tr>
                <tr>
                  <td style="padding:20px"><span style="background-color:#DFF81E;color:#DFF81E">.</span>Salem</td>
                </tr>
                <tr>
                  <td style="padding:20px"><span style="background-color:#5EBAD9;color:#5EBAD9">.</span>Sidati</td>
                </tr>
                <tr>
                  <td style="padding:20px"><span style="background-color:#8962F8;color:#8962F8">.</span>Souleyman</td>
                </tr>
                <tr>
                  <td style="padding:20px"><span style="background-color:#CC996D;color:#CC996D">.</span>Acha</td>
                </tr>
                <tr >
                  <td style="padding:20px"><span style="background-color:#525D49;color:#525D49">.</span>Selemhe</td>
                </tr>
              </table>
            </div>`;
          }
        }
        const headerToolbar = document.querySelector('.fc-toolbar-chunk') as HTMLElement;
        if(headerToolbar){
             const existingContent2 = headerToolbar.querySelector('.custom-content2');
            
            if (!existingContent2) {
              headerToolbar.insertAdjacentHTML('afterbegin', '<div class="custom-content2">Planning</div>');
            }
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
