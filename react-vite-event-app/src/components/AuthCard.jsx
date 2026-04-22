function AuthCard({ title, subtitle, children }) {
  return (
    <div className="row justify-content-center align-items-center min-vh-75">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            <h1 className="h3 fw-bold mb-2">{title}</h1>
            <p className="text-secondary mb-4">{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthCard;
