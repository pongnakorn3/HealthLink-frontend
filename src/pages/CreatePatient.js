import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreatePatient() {
    const [name, setName] = useState("");
    const [appointmentdate, setAppointmentDate] = useState("");
    const [status, setStatus] = useState("");
    
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await  axios.post("http://localhost:5000/create-patient", { 
            name, 
            appointmentdate, 
            status 
        });
        
                navigate('/'); //redirect to home page


        } catch (error) {
            setMessage("Error creating user, please try again");
        }
    }

    return (
        <div className='container'>
            <h1>Create Patient</h1>
            {message && <p className='text-danger'>{message}</p>}

            <form onSubmit = {handleSubmit}>
                <div className="w-25 p-3">
                    <label className='form-label'>Name: {name}</label>
                    <input type="text" 
                    className="form-control"
                    value = {name}
                    onChange = {(e) => setName(e.target.value)} 
                    required />
                </div>

                <div className="w-25 p-3">
                    <label className='form-label'>AppointmentDate: {appointmentdate}</label>
                    <input type="date"
                    className="form-control" 
                    value = {appointmentdate}
                    onChange = {(e) => setAppointmentDate(e.target.value)} 
                    required />
                </div>

                <div className="w-25 p-3">
  <label className='form-label'>Status:</label>
  <select 
    className="form-control"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    required
  >
    <option value="รอคิว">รอคิว</option>
    <option value="เสร็จสิ้น">เสร็จสิ้น</option>
    <option value="ยกเลิก">ยกเลิก</option>
  </select>
</div>


                

                <div className="w-25 p-3">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>

    )
}

export default CreatePatient;
