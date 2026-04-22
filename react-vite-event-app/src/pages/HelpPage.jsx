function HelpPage() {
  const helpItems = [
    {
      title: 'Create an account',
      text: 'Use the Register page to create a user account with your name, email address, and password. Validation checks are included to make sure the form is completed correctly.'
    },
    {
      title: 'Log in and access the dashboard',
      text: 'After registration, or by using the demo account, users can log in and access the protected dashboard page.'
    },
    {
      title: 'Add an event',
      text: 'Open the Add Event page and complete the event form with the name, date, time, location, and description.'
    },
    {
      title: 'View events',
      text: 'The dashboard supports a list view and a calendar-style grouped view. Both are rendered with React array.map() for dynamic display.'
    },
    {
      title: 'Edit or delete events',
      text: 'Each event includes action buttons that allow users to edit event details or remove the event. Changes update the app state immediately.'
    },
    {
      title: 'Navigation',
      text: 'A fixed Bootstrap header stays visible at the top of the app and includes links to Dashboard, Add Event, and Help.'
    },
    {
      title: 'Context API',
      text: 'React Context API is used to manage shared user data and event data across the whole app.'
    }
  ];

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-lg-5">
            <h1 className="h3 fw-bold mb-2">Help & User Guide</h1>
            <p className="text-secondary mb-0">
              This section explains how the main features of the Event Management App work.
            </p>
          </div>
        </div>
      </div>

      {helpItems.map((item) => (
        <div className="col-12 col-md-6" key={item.title}>
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <h2 className="h5 mb-3">{item.title}</h2>
              <p className="text-secondary mb-0">{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HelpPage;
