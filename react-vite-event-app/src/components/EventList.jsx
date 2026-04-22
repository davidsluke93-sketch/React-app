function EventList({ events, onEdit, onDelete }) {
  if (events.length === 0) {
    return <p className="text-secondary mb-0">No events yet. Add your first event to get started.</p>;
  }

  return (
    <div className="row g-3">
      {events.map((eventItem) => (
        <div className="col-12" key={eventItem.id}>
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                <div>
                  <h3 className="h5 mb-2">{eventItem.name}</h3>
                  <p className="mb-1"><strong>Date:</strong> {eventItem.date}</p>
                  <p className="mb-1"><strong>Time:</strong> {eventItem.time}</p>
                  <p className="mb-1"><strong>Location:</strong> {eventItem.location}</p>
                  <p className="mb-0"><strong>Description:</strong> {eventItem.description}</p>
                </div>
                <div className="d-flex flex-row flex-md-column gap-2 justify-content-start">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(eventItem)}>
                    Edit
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(eventItem.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventList;
