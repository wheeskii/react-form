// import React from "react";
// import { useForm } from 'react-hook-form';
import axios from "axios";
import { useEffect, useState } from "react";
// import { error } from "console";


// sample fetch
interface Task {
    id: number;
    taskName: string;
    content: string;
    is_complete: boolean;
    createdAt: Date;
    updatedAt: Date;
}


function Display() {
    
    const [ task, setTask ] = useState<Task[]>([]);
    // const [ content, setContent ] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            
            const res = await axios.get('http://localhost:8000/api/form/');
            setTask(res.data);
            
            
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/form/Testing').then((res) => {
    //         setContent(res.data.content);
    //     })
    // }, []);


    return (
        <div className="container">
            {task.length > 0 ? (
                <div className="container">
                    {task.map((task) => (
                        <div key={task.id}>
                        <h3>{task.taskName}</h3>
                            <p>{task.content}</p>
                            <p>{task.is_complete ? "Completed" : "Pending"}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
}

export default Display;
