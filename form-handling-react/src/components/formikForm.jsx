// src/components/FormikForm.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function FormikForm() {
  // Validation schema with Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Initial form values
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // Handle submit
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Formik submit:", values);

    // Mock API simulation
    setTimeout(() => {
      alert("Form submitted successfully!");
      setSubmitting(false);
      resetForm();
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Formik Registration Form</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Username */}
            <div className="mb-3">
              <label className="block mb-1">Username</label>
              <Field
                type="text"
                name="username"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="block mb-1">Email</label>
              <Field type="email" name="email" className="border p-2 w-full" />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="block mb-1">Password</label>
              <Field
                type="password"
                name="password"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormikForm;
