import './Card.css';
import OverLayBoard from './Job-Board.tsx';
import { useState } from 'react';

// corperate building IMG from:
//https://www.flaticon.com/free-icon/corporate-building_18337577?term=company&page=1&position=25&origin=search&related_id=18337577
//Pin IMG from:
//https://www.flaticon.com/free-icon/pin_927667?term=location&page=1&position=12&origin=search&related_id=927667
//Dollor sign from:
//https://www.flaticon.com/free-icon/dollar-symbol_126179?term=usd&page=1&position=1&origin=search&related_id=126179


interface CardProps {
    Title: string;
    Company: string;
    Location: string;
    JobType: string;
    Salary: number;
    description: string;  // Ensure that you use the correct spelling
    Requirements: string;
    DatePosted: Date;
    Contact: string; // Add 'Contact' field here
}

function Card(props: CardProps) {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    return (
        <>
            <div className='Card-Container' onClick={() => setIsOverlayOpen(true)}>
                <div className='Left-Side'>
                    <h1>{props.Title}</h1>
                    <div className='sub-Container'>
                        <img src={`${import.meta.env.BASE_URL}corporate-building.png`} alt="Company Logo" />
                        <h3>{props.Company}</h3>
                    </div>
                    <div className='sub-Container'>
                        <img src={`${import.meta.env.BASE_URL}pin.png`} alt="Location Logo" />
                        <h3>{props.Location}</h3>
                    </div>
                    <div className='sub-Container'>
                        <img src={`${import.meta.env.BASE_URL}dollar-symbol.png`} alt="USD Logo" />
                        <h3>Salary: ${props.Salary.toLocaleString()}</h3>
                    </div>
                </div>
                <div className='Right-Side'>
                    <h3 className="jobType">{props.JobType}</h3>
                    <h3 className="date">{props.DatePosted?.toLocaleDateString() || "N/A"}</h3>
                </div>
            </div>

            {/* Render the overlay only when it is open, passing the selected job's data */}
            {isOverlayOpen && <OverLayBoard onClose={() => setIsOverlayOpen(false)} job={props} />}
        </>
    );
}

export default Card;