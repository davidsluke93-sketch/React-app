import { useEffect, useState } from 'react';
import { validateEvent } from '../utils/validation';

const initialState = {
  name: '',
  date: '',
  time: '',
  location: '',
  description: ''
};

function EventForm({ onSubmit, initialValues, submitLabel = 'Save Event', onCancel }) {
  const [formData, setFormData] = useState(initialValues || initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialValues || initialState);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateEvent(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit(formData);
    if (!initialValues) {
      setFormData(initialState);
    }
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <div className="col-12">
          <label className="form-label">Event Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={formData.name}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            value={formData.date}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.date}</div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Time</label>
          <input
            type="time"
            name="time"
            className={`form-control ${errors.time ? 'is-invalid' : ''}`}
            value={formData.time}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.time}</div>
        </div>

        <div className="col-12">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className={`form-control ${errors.location ? 'is-invalid' : ''}`}
            value={formData.location}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.location}</div>
        </div>

        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            rows="4"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            value={formData.description}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.description}</div>
        </div>
      </div>

      <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EventForm;
