import React from 'react';
import { useState, useEffect } from 'react';
import axios, { isCancel, AxiosError } from 'axios';
import { Link } from 'react-router-dom';    //import Link

function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        try {
            const res = await axios.get('http://localhost:5000/');
            console.log("Fetched Data:", res.data);  // ตรวจสอบข้อมูลที่ได้จาก API
            setData(res.data);
            console.log("Success");
        } catch (error) {
            console.log("Fail", error);
        }
    };


    const deleteUser = async (id) => {
        if (window.confirm("Are you sure ?")) {
            try {
               await axios.delete(`http://localhost:5000/delete-patient/${id}`);
                fetchPatient()
                

            } catch (error) {
                console.log("Error deleting patient: " + error)
            }
        }
    }

    return (
        <>

            <div className='container text-center'>

                <h1>Patient Management</h1>

                <Link to="/create-patient" className='btn btn-primary btn-sm mb-3'>Create New</Link> 

                <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">AppointmentDate</th>
                            <th scope="col">Status</th>
                            
                            <th scope="col">Action</th>
                            
                            

                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.appointmentdate}</td>
                                <td>{item.status}</td>
                                
                                <td>
                              <button className="btn btn-warning">  <Link to ={`edit-patient/${item.id}`} className='MyFontBlack'>Edit</Link></button>
                                    {" "}
                                    <button className="btn btn-danger"> <Link to="#" className='MyFont' onClick={() => deleteUser(item.id)}>Delete</Link> </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </>

    )
}
export default Home;