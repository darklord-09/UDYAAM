import React,{useEffect,useState} from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
export default function MyOrder() {
    const [orderdata, setOrderdata] = useState({});

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))

         await fetch("http://localhost:5000/api/myorderdata", {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json();
            console.log("h:",response);
            await setOrderdata(response);
        })


        // await res.map((data)=>{
        //    console.log(data)
        // })
        


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            {<div className='container'>
                <div className='row'>
                     {orderdata !=={}?Array(orderdata).map((item)=>{
                        
                        return(
                            
                           item.orderdata?
                            <div>
                             {
                                item.orderdata.order_data.map((obj)=>{
                                    return(
                                        obj.map((arrdata)=>{
                                            return(
                                                
                                             arrdata.qty?<div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrdata.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>Number:{arrdata.qty}</span>
                                                                        <span className='m-1'>type:{arrdata.size}</span>
                                                                        
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>:""
                                            )
                                        })
                                    )
                                })
                            }
                            </div>:""
                            
                            
                            
                            )
                         
                            
                        
                     }):""
                     }                    
                </div>


                    </div>}

          <div><Footer /></div>
            
        </div>
    )
}