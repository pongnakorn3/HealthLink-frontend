import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePatient = () => {
    const [name, setName] = useState("");
    const [appointmentdate, setAppointmentDate] = useState("");
    const [status, setStatus] = useState("");
    
    const [message, setMessage] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/patient/${id}`);
                setName(res.data.name);
                setAppointmentDate(res.data.appointmentdate);
                setStatus(res.data.status);
                

            } catch (error) {
                setMessage("Error Fetching User")

            }
            //ถ้า ไม่มี Dependency => useEffect() จะทำงานทุกครั้งที่ Component ทำการ render
            //ถ้า [] ว่างเปล่า => useEffect() จะทำฃานแค่ตอน mount (โหลดครั้งแรกเท่านั้น)
            //ถ้ามีค่าใน Dependency => useEffect() จะทำงานเมื่อค่าที่กำหนดเปลี่ยนแปลง
        }
        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
           await axios
                .put(`http://localhost:5000/update-patient/${id}`, { name, appointmentdate, status });
            navigate("/")

        } catch (error) {
            setMessage("Error Updating User. Please Try Again")

        }
    }

    return (
        <div className='container'>
            <h2>Update Patient</h2>
            {message && <p className='text-danger'>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className='w-25 mb-3'>
                    <label className='form-label'>Name: {name}</label>
                    <input
                        type='text'
                        className='form-control'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>AppointmentDate: {appointmentdate}</label>
                    <input
                         type="date"
                        className='form-control'
                        value={appointmentdate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Status: {status}</label>
                    <input
                        type='text'
                        className='form-control'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    />
                </div>

                

                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
        </div>
    )
}
export default UpdatePatient;