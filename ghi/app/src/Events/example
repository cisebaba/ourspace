import React, { useState } from "react";

function TechnicianForm() {
  const [state, setState] = useState({
    name: "",
    employee_number: "",
  });
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  let formClasses = "";
  let alertClasses = "alert alert-success d-none mb-3";
  let alertContainerClasses = "d-none";

  const handleSubmit = async event => {
    event.preventDefault();
    const data = state;

    const technicianUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(technicianUrl, fetchConfig);

    if (response.ok) {
      setState({
        name: "",
        employee_number: "",
      });
      setSuccessfulSubmit(true);
    }
  };

  const handleChange = event => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  if (successfulSubmit) {
    formClasses = "d-none";
    alertClasses = "alert alert-success mb-3";
    alertContainerClasses = "";
  }

  return (
    <div className='row'>
      <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
          <h1>Create a new technician</h1>
          <form
            onSubmit={handleSubmit}
            id='create-technician-form'
            className={formClasses}
          >
            <div className='form-floating mb-3'>
              <input
                onChange={handleChange}
                value={state.name}
                placeholder='Technician Name'
                required
                name='name'
                id='technician_name'
                className='form-control'
              />
              <label htmlFor='style_name'>Name</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                onChange={handleChange}
                value={state.employee_number}
                placeholder='Employee Number'
                required
                name='employee_number'
                id='employee_number'
                className='form-control'
              />
              <label htmlFor='color'>Employee Numbver</label>
            </div>
            <button className='btn btn-primary'>Create</button>
          </form>
          <div className={alertContainerClasses}>
            <div className={alertClasses} id='success-message'>
              Technician created successfully
            </div>
            <button
              onClick={() => setSuccessfulSubmit(false)}
              className='btn btn-primary'
            >
              Create another Technician
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicianForm;



<div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add Appointment!</h1>
                <form onSubmit={this.handleSubmit} id="create-appointment-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleChangeVin} value={this.state.vin_num} placeholder="vin_num" required type="text" name="vin_num" id="vin_num" className="form-control" />
                        <label htmlFor="vin_num">VIN Number</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleChangeOwner} value={this.state.owner} placeholder="owner" required type="text" name="owner" id="owner" className="form-control" />
                        <label htmlFor="owner">Car Owner</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleChangeDate} value={this.state.date} placeholder="date" required type="date" name="date" id="date" className="form-control" />
                        <label htmlFor="date">Appointment Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleChangeTime} value={this.state.time} placeholder="time" type="time" name="time" id="time" className="form-control" />
                        <label htmlFor="time">Appointment Time</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={this.handleChangeTechnician} value={this.state.technician} required name="technician" id="technician" className="form-select">
                        <option value="">Choose a Technician</option>
                        {this.state.technicians.map(tech => {
                            return (
                            <option key={tech.id} value={tech.id}>{tech.name}</option>
                            )
                        })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleChangeReason} value={this.state.reason} placeholder="reason" required type="text" name="reason" id="reason" className="form-control" />
                        <label htmlFor="reason">Purpose of Visit</label>
                    </div>
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
            </div>
        </div>