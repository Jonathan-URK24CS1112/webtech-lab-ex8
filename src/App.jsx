import { useState } from "react";
import {
  HashRouter,
  Link,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

const products = [
  {
    icon: "M65 80h110M50 55v50M65 45v70M175 45v70M190 55v50",
    name: "Dumbbells",
    description: "Strength training essentials",
    price: "Rs. 2,500",
  },
  {
    icon: "M40 115h155l-20-20H65zM155 95l-15-65h35M125 30h50M155 60h30",
    name: "Treadmill",
    description: "Cardio at your own pace",
    price: "Rs. 28,000",
  },
  {
    icon: "M60 130h125M85 100l50-45 25 55H85M130 55h25M110 40h35M158 100l15-65h20",
    name: "Exercise Bike",
    description: "Everyday indoor cycling",
    price: "Rs. 15,000",
  },
];

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-success">
      <div className="container flex-wrap gap-2">
        <Link className="navbar-brand fw-bold" to="/">
          FIT | Jonathan URK24CS1112
        </Link>
        <div className="d-flex gap-3">
          <NavLink
            end
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "fw-bold text-decoration-underline" : ""}`
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "fw-bold text-decoration-underline" : ""}`
            }
            to="/register"
          >
            Registration
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

function ProductCard({ product }) {
  return (
    <div className="col-md-4">
      <article className="card h-100 shadow-sm border-success-subtle">
        <div className="card-body text-center p-4">
          <svg viewBox="0 0 240 160" width="160" height="105"
            fill="none" stroke="currentColor" strokeWidth="8"
            strokeLinecap="round" strokeLinejoin="round"
            className="text-success" aria-hidden="true">
            <path d={product.icon} />
            {product.name === "Exercise Bike" &&
              <circle cx="85" cy="100" r="28" />}
          </svg>
          <h3 className="h5 mt-3">{product.name}</h3>
          <p className="text-secondary">{product.description}</p>
          <strong className="text-success">{product.price}</strong>
        </div>
      </article>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="bg-success-subtle rounded-3 p-4 p-md-5 mb-4">
        <h1 className="display-6 fw-bold text-success">
          Your Fitness Journey Starts Here
        </h1>
        <p className="lead">
          Find workout essentials and register to become a fitness store
          member.
        </p>
        <Link to="/register" className="btn btn-success btn-lg">
          Register Now
        </Link>
      </section>
      <section aria-labelledby="equipment-title">
        <h2 id="equipment-title" className="h3 mb-3">
          Equipment Essentials
        </h2>
        <div className="row g-3">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

const initialForm = {
  name: "",
  email: "",
  password: "",
  age: "",
  mobile: "",
  gender: "",
  state: "",
};

function validate(form) {
  return {
    name: !form.name.trim()
      ? "Full name is required."
      : /^[A-Za-z ]+$/.test(form.name.trim())
        ? ""
        : "Enter a name using letters and spaces only.",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? ""
      : "Enter a valid email address.",
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password)
      ? ""
      : "Use at least 8 characters, including uppercase, lowercase and a number.",
    age:
      /^\d+$/.test(form.age) &&
      Number(form.age) >= 18 &&
      Number(form.age) <= 30
        ? ""
        : "Age must be between 18 and 30.",
    mobile: /^\d{10}$/.test(form.mobile) ? "" : "Enter exactly 10 digits.",
    gender: form.gender ? "" : "Select a gender.",
    state: form.state ? "" : "Select a state.",
  };
}

function Register() {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const errors = validate(form);
  const valid = Object.values(errors).every((error) => error === "");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setTouched((previous) => ({ ...previous, [name]: true }));
    setSubmitted(false);
  }

  function submitForm(event) {
    event.preventDefault();
    setTouched(
      Object.fromEntries(Object.keys(form).map((field) => [field, true])),
    );
    if (valid) setSubmitted(true);
  }

  function field(name, label, type = "text", placeholder = "") {
    return (
      <div className="col-md-6">
        <label htmlFor={name} className="form-label fw-semibold">
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          className={`form-control ${touched[name] ? (errors[name] ? "is-invalid" : "is-valid") : ""}`}
          value={form[name]}
          placeholder={placeholder}
          onChange={updateField}
          onBlur={() => setTouched((old) => ({ ...old, [name]: true }))}
          aria-invalid={Boolean(touched[name] && errors[name])}
          aria-describedby={`${name}-error`}
          required
        />
        {touched[name] && errors[name] && (
          <div id={`${name}-error`} className="invalid-feedback">
            {errors[name]}
          </div>
        )}
      </div>
    );
  }

  function dropdown(name, label, options) {
    return (
      <div className="col-md-6">
        <label htmlFor={name} className="form-label fw-semibold">
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={form[name]}
          onChange={updateField}
          onBlur={() => setTouched((old) => ({ ...old, [name]: true }))}
          aria-invalid={Boolean(touched[name] && errors[name])}
          aria-describedby={`${name}-error`}
          required
          className={`form-select ${touched[name] ? (errors[name] ? "is-invalid" : "is-valid") : ""}`}
        >
          <option value="">Choose {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {touched[name] && errors[name] && (
          <div id={`${name}-error`} className="invalid-feedback">
            {errors[name]}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="card shadow-sm mx-auto" style={{ maxWidth: 800 }}>
      <div className="card-body p-4 p-md-5">
        <h1 className="h2 text-success">Fitness Store Registration</h1>
        <p className="text-secondary mb-4">
          Join our fitness community. All fields are required.
        </p>
        <form onSubmit={submitForm} noValidate>
          <div className="row g-3">
            {field("name", "Full Name", "text", "Enter your full name")}
            {field("email", "Email Address", "email", "name@example.com")}
            {field(
              "password",
              "Password",
              "password",
              "Choose a strong password",
            )}
            {field("age", "Age", "number", "18–30")}
            {field(
              "mobile",
              "Mobile Number",
              "tel",
              "10-digit mobile number",
            )}
            {dropdown("gender", "Gender", ["Male", "Female", "Other"])}
            {dropdown("state", "State", [
              "Tamil Nadu",
              "Kerala",
              "Karnataka",
              "Andhra Pradesh",
            ])}
          </div>
          <button
            type="submit"
            className="btn btn-success mt-4"
            disabled={!valid}
          >
            Submit Registration
          </button>
          {submitted && (
            <div className="alert alert-success mt-3" role="status">
              Registration completed successfully!
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-top bg-white text-center text-secondary py-3 mt-5">
      <small>
        Jonathan URK24CS1112 | Fitness Store, Coimbatore | Web Technology
        Lab 2026–2027
      </small>
    </footer>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
