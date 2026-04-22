import { useMemo, useState } from 'react';
import EventCalendarView from '../components/EventCalendarView';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import { useApp } from '../context/AppContext';

function DashboardPage() {
  const { currentUser, events, deleteEvent, updateEvent } = useApp();
  const [viewMode, setViewMode] = useState('list');
  const [editingEvent, setEditingEvent] = useState(null);

  const totalEvents = events.length;
  const upcomingEvents = useMemo(
    () => events.filter((eventItem) => new Date(`${eventItem.date}T${eventItem.time}`) >= new Date()).length,
    [events]
  );

  const handleSaveEdit = (formData) => {
    updateEvent({ ...editingEvent, ...formData });
    setEditingEvent(null);
  };

  return (
    <div className="d-flex flex-column gap-4">
      <section className="hero-card card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-body p-4 p-lg-5">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-8">
              <p className="text-uppercase small fw-semibold text-primary mb-2">Dashboard</p>
              <h1 className="display-6 fw-bold mb-3">Hello, {currentUser?.name}</h1>
              <p className="text-secondary mb-0">
                Review your event schedule, switch between list and calendar-style views, and keep everything up to date.
              </p>
            </div>
            <div className="col-12 col-lg-4">
              <div className="row g-3">
                <div className="col-6 col-lg-12">
                  <div className="stats-box rounded-4 p-3 bg-light border">
                    <div className="small text-secondary">Total Events</div>
                    <div className="fs-3 fw-bold">{totalEvents}</div>
                  </div>
                </div>
                <div className="col-6 col-lg-12">
                  <div className="stats-box rounded-4 p-3 bg-light border">
                    <div className="small text-secondary">Upcoming</div>
                    <div className="fs-3 fw-bold">{upcomingEvents}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {editingEvent && (
        <section className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h2 className="h4 mb-1">Edit Event</h2>
                <p className="text-secondary mb-0">Update the details below and save your changes.</p>
              </div>
            </div>
            <EventForm
              initialValues={editingEvent}
              onSubmit={handleSaveEdit}
              submitLabel="Update Event"
              onCancel={() => setEditingEvent(null)}
            />
          </div>
        </section>
      )}

      <section className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
              <h2 className="h4 mb-1">Your Events</h2>
              <p className="text-secondary mb-0">These events are rendered dynamically using React map().</p>
            </div>
            <div className="btn-group" role="group" aria-label="View mode">
              <button
                type="button"
                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('list')}
              >
                List View
              </button>
              <button
                type="button"
                className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('calendar')}
              >
                Calendar View
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <EventList events={events} onEdit={setEditingEvent} onDelete={deleteEvent} />
          ) : (
            <EventCalendarView events={events} onEdit={setEditingEvent} onDelete={deleteEvent} />
          )}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
