function EventCalendarView({ events, onEdit, onDelete }) {
  if (events.length === 0) {
    return <p className="text-secondary mb-0">No events yet. Add your first event to get started.</p>;
  }

  const groupedByDate = events.reduce((accumulator, eventItem) => {
    accumulator[eventItem.date] = accumulator[eventItem.date] || [];
    accumulator[eventItem.date].push(eventItem);
    return accumulator;
  }, {});

  return (
    <div className="row g-3">
      {Object.entries(groupedByDate).map(([date, dayEvents]) => (
        <div className="col-12 col-lg-6" key={date}>
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-primary text-white fw-semibold">{date}</div>
            <div className="card-body">
              {dayEvents.map((eventItem) => (
                <div key={eventItem.id} className="calendar-event-item pb-3 mb-3 border-bottom last-border-none">
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <h3 className="h6 mb-1">{eventItem.name}</h3>
                      <p className="mb-1 small"><strong>Time:</strong> {eventItem.time}</p>
                      <p className="mb-1 small"><strong>Location:</strong> {eventItem.location}</p>
                      <p className="mb-0 small">{eventItem.description}</p>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(eventItem)}>
                        Edit
                      </button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(eventItem.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventCalendarView;
