
import './Job-Board.css'

interface OverlayProps {
    onClose: () => void;
    job: {
        Title: string;
        Company: string;
        Location: string;
        JobType: string;
        Salary: number;
        describtion: string;
        DatePosted: Date;
        Requirements: string;
        Contact: string;
    };
  }

function Board({ onClose, job }: OverlayProps) {
    const requirements = job.Requirements?.trim().split(',').map(req => req.trim()).filter(req => req !== '') || [];

    return <div className='Board-Container'>
        <div className='Board-Content'>
            <h1>{job.Title}</h1>
            <h3>Company: {job.Company}</h3>
            <h3>Location: {job.Location}</h3>
            <h3>Job Type: {job.JobType}</h3>
            <h3>Salary: ${job.Salary.toLocaleString()}</h3>
            <h4>Date Posted: {job.DatePosted?.toLocaleDateString() || "N/A"}</h4>
            <h2>Job Describtion: </h2>
            <p>{job.describtion}</p>
            <h2>Requirements: </h2>
            {requirements.length > 0 ? (
          <ul>
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>  // Render each requirement as a bullet point
            ))}
          </ul>
            ) : (
            <p>No requirements listed.</p>  // Handle missing requirements
            )}
            <h2>How To Apply: </h2>
            <div className='Bottom-Buttons'>
                <button id="Button" onClick={onClose}>Close</button>
                <button id="Apply-Button">Apply</button>
            </div>
        </div>
    </div>
}

export default Board;