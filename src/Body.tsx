import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Cards from './Card.tsx';
import './Body.css';

function Body() {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {
        // Adjust file path for production with the base path
        const filePath = process.env.NODE_ENV === 'production' 
            ? '/mka-job-board/Jobs.csv'  // Production path with the base URL
            : '/Jobs.csv';               // Development path (directly from public folder)

        console.log('Fetching CSV from:', filePath); // Log to verify the correct path
        
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    console.error(`Error fetching CSV: ${response.status}`);
                }
                return response.text();
            })
            .then(csvText => {
                const parsedData = Papa.parse(csvText, { header: true, dynamicTyping: true });
                const jobsWithDates = parsedData.data.map((job: any) => ({
                    ...job,
                    DatePosted: job.DatePosted ? new Date(job.DatePosted) : new Date(),
                    description: job.Description || 'No description available',
                    Requirements: job.Requirements || 'No requirements listed',
                    Contact: job.Contact || 'No contact information',
                }));
                setJobs(jobsWithDates);
            })
            .catch(error => console.error("Error loading CSV:", error));
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.Company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.Location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.JobType?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='Body-Content'>
            <div className='Container'>
                <input 
                    type='text' 
                    placeholder='Search...' 
                    className='search-bar' 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
            <div className='Card-Containers'>
                {jobs.length === 0 ? (
                    <p>Loading jobs...</p>
                ) : filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                        <Cards
                            key={index}
                            Title={job.Title}
                            Company={job.Company}
                            Location={job.Location}
                            JobType={job.JobType}
                            Salary={job.Salary}
                            description={job.description} 
                            Requirements={job.Requirements}
                            DatePosted={job.DatePosted}
                            Contact={job.Contact}
                        />
                    ))
                ) : (
                    <p>No jobs found.</p>
                )}
            </div>
        </div>
    );
}

export default Body;