import './Card.css';

interface CarProps {
    Title: String;
    Company: String;
    Location: String;
    JobType: string;
    Salary: number;
    describtion: String;
    DatePosted: Date;
}
function Card({ Title, Company, Location, JobType, Salary, describtion, DatePosted }: CarProps) {

    // Format the salary to USD
    const formattedSalary = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Salary);

    return <div className='Card-Container'>
        <div className='Left-Side'>
            <h1>{Title}</h1>
            <h3>{Company}</h3>
            <h3>{Location}</h3>
            <h3>Salary: {formattedSalary}</h3>
            <h3>{describtion}</h3>
        </div>
        <div className='Right-Side'>
            <h3 className="right-align" id='jobType'>{JobType}</h3>
            <h3 className="right-align">{DatePosted.toLocaleDateString()}</h3>
        </div>
    </div>
}

export default Card;