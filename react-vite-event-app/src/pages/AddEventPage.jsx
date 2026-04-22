import { useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { useApp } from '../context/AppContext';

function AddEventPage() {
  const { addEvent } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    addEvent(formData);
    navigate('/dashboard');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-xl-8">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-lg-5">
            <h1 className="h3 fw-bold mb-2">Add New Event</h1>
            <p className="text-secondary mb-4">Create an event with all the important details.</p>
            <EventForm onSubmit={handleSubmit} submitLabel="Add Event" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEventPage;
