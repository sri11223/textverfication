import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Reviews = () => {
  return (
    <section className="bg-white">
      <div className="container py-12">
        <h2 className="text-center display-4 font-weight-bold text-dark">
          Read trusted reviews from our customers
        </h2>

        <div className="mt-8 row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    alt="Reviewer"
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                  <div>
                    <div className="d-flex justify-content-center gap-0.5 text-success">
                      {/* Star Icons */}
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <path
                            d="M3.612 15.443c-.396.381-.92.587-1.461.55l-3.309-.23a1.003 1.003 0 0 1-.848-.944c-.015-.164.019-.327.089-.47l2.062-2.034a1.002 1.002 0 0 0 .274-.759l-.481-3.206c-.09-.644.313-1.199.916-1.267l3.199-.463a1.005 1.005 0 0 1 .756-.18l2.582 1.4c.326.177.545.492.588.858l.35 3.275a1 1 0 0 1-.303.782l-2.335 2.043c-.369.33-.531.81-.468 1.3l.453 3.283c.06.448-.197.882-.64 1.073z"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-2 h5 text-dark">Paul Starr</p>
                  </div>
                </div>
                <p className="mt-4 text-muted">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a
                  consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus
                  error officiis atque voluptates magnam!
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    alt="Reviewer"
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                  <div>
                    <div className="d-flex justify-content-center gap-0.5 text-success">
                      {/* Star Icons */}
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <path
                            d="M3.612 15.443c-.396.381-.92.587-1.461.55l-3.309-.23a1.003 1.003 0 0 1-.848-.944c-.015-.164.019-.327.089-.47l2.062-2.034a1.002 1.002 0 0 0 .274-.759l-.481-3.206c-.09-.644.313-1.199.916-1.267l3.199-.463a1.005 1.005 0 0 1 .756-.18l2.582 1.4c.326.177.545.492.588.858l.35 3.275a1 1 0 0 1-.303.782l-2.335 2.043c-.369.33-.531.81-.468 1.3l.453 3.283c.06.448-.197.882-.64 1.073z"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-2 h5 text-dark">Paul Starr</p>
                  </div>
                </div>
                <p className="mt-4 text-muted">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a
                  consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus
                  error officiis atque voluptates magnam!
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    alt="Reviewer"
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                  <div>
                    <div className="d-flex justify-content-center gap-0.5 text-success">
                      {/* Star Icons */}
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <path
                            d="M3.612 15.443c-.396.381-.92.587-1.461.55l-3.309-.23a1.003 1.003 0 0 1-.848-.944c-.015-.164.019-.327.089-.47l2.062-2.034a1.002 1.002 0 0 0 .274-.759l-.481-3.206c-.09-.644.313-1.199.916-1.267l3.199-.463a1.005 1.005 0 0 1 .756-.18l2.582 1.4c.326.177.545.492.588.858l.35 3.275a1 1 0 0 1-.303.782l-2.335 2.043c-.369.33-.531.81-.468 1.3l.453 3.283c.06.448-.197.882-.64 1.073z"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-2 h5 text-dark">Paul Starr</p>
                  </div>
                </div>
                <p className="mt-4 text-muted">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a
                  consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus
                  error officiis atque voluptates magnam!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
