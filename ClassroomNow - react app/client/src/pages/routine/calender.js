import React, {Component} from 'react';
//import { useState } from "react";
import {DayPilot, DayPilotCalendar} from "daypilot-pro-react";


class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewType: "WorkWeek",
      headerDateFormat: "dddd",
      cellHeight: 40,
      showAllDayEvents: true,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async (args) => {
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        const dp = args.control;
        dp.clearSelection();
        if (modal.canceled) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      eventDeleteHandling: "Update",
      onEventDeleted: (args) => {
        args.control.message("Event deleted: " + args.e.text());
      },
      eventMoveHandling: "Update",
      onEventMoved: (args) => {
        args.control.message("Event moved: " + args.e.text());
      },
      eventResizeHandling: "Update",
      onEventResized: (args) => {
        args.control.message("Event resized: " + args.e.text());
      },
      eventClickHandling: "Edit",
      eventEditHandling: "Update",
      onEventEdited: (args) => {
        args.control.message("Event edited: " + args.e.text());
      },
      eventHoverHandling: "Bubble",
      bubble: new DayPilot.Bubble({
        onLoad: (args) => {
          args.html = "Event details";
        }
      }),
      contextMenu: new DayPilot.Menu({
        items: [
          { text: "Delete", onClick: (args) => { const dp = args.source.calendar; dp.events.remove(args.source); } }
        ]
      }),
    };
  }

  componentDidMount() {

    

    // load resource and event data
    this.setState({
      startDate: DayPilot.Date.today(),
      events: [
        {
          id: 1,
          text: "Event 1",
          start: DayPilot.Date.today().addHours(10),
          end: DayPilot.Date.today().addHours(11)
        },
        {
          id: 2,
          text: "Event 2",
          start: DayPilot.Date.today().addHours(8),
          end: DayPilot.Date.today().addHours(9)
        }
      ]
    });

  }

  render() {
    var {...config} = this.state;
    return (
      <div>
        <DayPilotCalendar
          {...config}
          ref={component => {
            this.calendar = component && component.control;
          }}
        />
      </div>
    );
  }
}



export default Calendar;
