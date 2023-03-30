import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'



export default function Home() {
    const [search, setSearch] = useState('');
   
    const [investItem, setInvestItem] = useState([]);
    const [investCat, setInvestCat] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/investmentData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            }
        });

        response = await response.json();
        setInvestItem(response[0]);
        setInvestCat(response[1]);
        // console.log(response[0],response[1]);
    }
    //this empty square braces means no dependency on any element this loads on first reload of page
    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
                            {/*<button className="btn btn-outline-success" type="submit">Search</button>*/}
                        </div>
                    </div>

                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/600x500/?stocks" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/600x500/?shares" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/600x500/?executives" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container'>
                {
                    investCat !== [] ? investCat.map((data) => {
                        return (<div className='row mb-3'>
                            <div key={data._id} className='fs-3 ms-3'>

                                <div>{data.CategoryName}</div>
                            </div>
                            <hr />
                            {
                                investItem !== [] ? investItem.filter((item) =>
                                    (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                                ).map(filterItems => {
                                   return (
                                        <div key={filterItems._id} className='col-12 col-md-12 col-lg-4'>
                                            <Card investmentItem = {filterItems}
                                                
                                                options={filterItems.options[0]}
                                               
                                            ></Card>
                                        </div>
                                    )
                                    
                                }) : <div>No such Data Found</div>
                            
                           
                           }
                        </div>)
                    }) : ""
                }
                
            </div>
            <div><Footer /></div>
        </div>
    )
}
