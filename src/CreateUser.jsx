import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

function CreateUser({ editUser, setEditUser, userInfo }) {
  const NavigateToUsers = useNavigate();

  return (
    <Formik
      initialValues={{ ...editUser }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        username: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        address: Yup.object({
          street: Yup.string().required("Required"),
          suite: Yup.string().required("Required"),
          city: Yup.string().required("Required"),
          zipcode: Yup.string().required("Required"),
          geo: Yup.object({
            lat: Yup.string(),
            lng: Yup.string(),
          }),
        }),
        phone: Yup.string().required("Required"),
        website: Yup.string(),
        company: Yup.object({
          name: Yup.string().required("Required"),
          catchPhrase: Yup.string(),
          bs: Yup.string(),
        }),
      })}
      onSubmit={
        editUser?.id
          ? async (values, { setSubmitting }) => {
              try {
                await axios.put(
                  `https://664af140a300e8795d438505.mockapi.io/data/users/${editUser.id}`,
                  values
                );

                setTimeout(() => {
                  alert("User updated successfully!");
                }, 100);
                NavigateToUsers("/userdata");
              } catch (error) {
                console.log(error);
              } finally {
                setEditUser(userInfo);
                setSubmitting(false);
              }
            }
          : async (values, { setSubmitting }) => {
              try {
                await axios.post(
                  "https://664af140a300e8795d438505.mockapi.io/data/users",
                  values
                );

                setTimeout(() => {
                  alert("User created successfully!");
                }, 100);
                NavigateToUsers("/userdata");
              } catch (error) {
                console.log(error);
              } finally {
                setEditUser(userInfo);
                setSubmitting(false);
              }
            }
      }
    >
      {(formik) => (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              {" "}
              {editUser?.id ? (
                <h3 className="text-center mt-3 mb-3 text-muted">
                  Update User
                </h3>
              ) : (
                <h3 className="text-center mt-3 mb-3 text-muted">
                  New User Registration
                </h3>
              )}
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="John Doe"
                    {...formik.getFieldProps("name")}
                  />

                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}

                  <label htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="john"
                    {...formik.getFieldProps("username")}
                  />

                  {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                  ) : null}

                  <label htmlFor="username">Username</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Johndoe@email.com"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                  <label htmlFor="email">Email</label>
                </div>

                <div className="row gap-1">
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="address-street"
                        placeholder=""
                        {...formik.getFieldProps("address.street")}
                      />

                      {formik.touched.address?.street &&
                      formik.errors.address?.street ? (
                        <div>{formik.errors.address.street}</div>
                      ) : null}

                      <label htmlFor="address-street">Street</label>
                    </div>
                  </div>

                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="address-suite"
                        placeholder=""
                        {...formik.getFieldProps("address.suite")}
                      />
                      {formik.touched.address?.suite &&
                      formik.errors.address?.suite ? (
                        <div>{formik.errors.address.suite}</div>
                      ) : null}
                      <label htmlFor="address-suite">Suite</label>
                    </div>
                  </div>
                </div>

                <div className="row gap-2">
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="address-city"
                        placeholder=""
                        {...formik.getFieldProps("address.city")}
                      />

                      {formik.touched.address?.city &&
                      formik.errors.address?.city ? (
                        <div>{formik.errors.address.city}</div>
                      ) : null}

                      <label htmlFor="address-city">City</label>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="address-zipcode"
                        placeholder=""
                        {...formik.getFieldProps("address.zipcode")}
                      />
                      {formik.touched.address?.zipcode &&
                      formik.errors.address?.zipcode ? (
                        <div>{formik.errors.address.zipcode}</div>
                      ) : null}
                      <label htmlFor="address-zipcode">Zipcode</label>
                    </div>
                  </div>
                </div>

                <div className="row gap-2">
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="address-geo-lat"
                        placeholder=""
                        {...formik.getFieldProps("address.geo.lat")}
                      />

                      {formik.touched.address?.geo?.lat &&
                      formik.errors.address?.geo?.lat ? (
                        <div>{formik.errors.address.geo.lat}</div>
                      ) : null}
                      <label htmlFor="address-geo-lat">Latitude</label>
                    </div>
                  </div>

                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="address-geo-lng"
                        placeholder=""
                        {...formik.getFieldProps("address.geo.lng")}
                      />

                      {formik.touched.address?.geo?.lng &&
                      formik.errors.address?.geo?.lng ? (
                        <div>{formik.errors.address.geo.lng}</div>
                      ) : null}

                      <label htmlFor="address-geo-lng">Longitude</label>
                    </div>
                  </div>
                </div>

                <div className="row gap-2">
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder=""
                        {...formik.getFieldProps("phone")}
                      />

                      {formik.touched.phone && formik.errors.phone ? (
                        <div>{formik.errors.phone}</div>
                      ) : null}

                      <label htmlFor="phone">Phone</label>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="website"
                        placeholder=""
                        {...formik.getFieldProps("website")}
                      />
                      {formik.touched.website && formik.errors.website ? (
                        <div>{formik.errors.website}</div>
                      ) : null}

                      <label htmlFor="website">Website</label>
                    </div>
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="company-name"
                    placeholder=""
                    {...formik.getFieldProps("company.name")}
                  />

                  {formik.touched.company?.name &&
                  formik.errors.company?.name ? (
                    <div>{formik.errors.company.name}</div>
                  ) : null}

                  <label htmlFor="company-name">Company Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="company-catchPhrase"
                    placeholder=""
                    {...formik.getFieldProps("company.catchPhrase")}
                  />
                  {formik.touched.company?.catchPhrase &&
                  formik.errors.company?.catchPhrase ? (
                    <div>{formik.errors.company.catchPhrase}</div>
                  ) : null}
                  <label htmlFor="company-catchPhrase">
                    Company Catchphrase
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="company-bs"
                    placeholder=""
                    {...formik.getFieldProps("company.bs")}
                  />
                  {formik.touched.company?.bs && formik.errors.company?.bs ? (
                    <div>{formik.errors.company.bs}</div>
                  ) : null}
                  <label htmlFor="company-bs">
                    Company Business Strategy (BS)
                  </label>
                </div>
                <div className="row justify-content-center mb-3">
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default CreateUser;
