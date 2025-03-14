
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Cards from './Card.tsx';
import './Body.css';



function Body() {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState<any[]>([]);
    const datePosted = new Date('2025-03-14');

    useEffect(() => {
        fetch('/Jobs.csv')
            .then(response => response.text())
            .then(csvText => {
                const parsedData = Papa.parse(csvText, { header: true, dynamicTyping: true });

                // Ensure the DatePosted field is converted into Date
                const jobsWithDates = parsedData.data.map((job: any) => ({
                    ...job,
                    DatePosted: job.DatePosted ? new Date(job.DatePosted) : new Date()
                }));

                setJobs(jobsWithDates);
            })
            .catch(error => console.error("Error loading CSV:", error));
    }, []);

    // Filter jobs dynamically
    const filteredJobs = jobs.filter(job =>
        job.Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.Company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.Location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.JobType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.describtion?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return <>
        <div className='Body-Content'>
            <div className='Container'>
                <input type='text' placeholder='Search...' className='search-bar' 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}>
                </input>
            </div>
            <div className='Card-Containers'>
                {jobs.length === 0 ? (
                    <p>Loading jobs...</p>  // Prevents "No jobs found" message before data loads
                ) : filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => <Cards key={index} {...job} />)
                ) : (
                    <p>No jobs found.</p>
                )}
            </div>
        </div>
    </>
}

export default Body;