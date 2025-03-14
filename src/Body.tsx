
import { useState } from 'react';
import Cards from './Card.tsx';
import './Body.css';

function Body() {
    const datePosted = new Date('2025-03-14');
    return <>
        <div className='Body-Content'>
            <div className='Container'>
                <input type='text' placeholder='Search...' className='search-bar'></input>
            </div>
            <div className='Card-Containers'>
                <Cards 
                    Title={"Front End Developer"}
                    Company={"MKA USA"}
                    Location={"Chicago"}
                    JobType={"On-Site"}
                    Salary={90000}
                    describtion={"Front End Development role focused on maintaining website UI with React + Vite framework"}
                    DatePosted={datePosted}
                ></Cards>


            </div>
        </div>
    </>
}

export default Body;