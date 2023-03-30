import React,{useState,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom';
import { useCart,useDispatchCart } from './ContextReducer'; 
export default function Card(props) {
  let dispatch = useDispatchCart();  
    let option=props.options;
    let priceOptions= Object.keys(option||{});
    let data=useCart()
    const priceRef=useRef();
    const [qty , setQty]=useState(0);
    const [size ,setSize]=useState("");
    
    
    const handleBuy= async()=>{
        
        await dispatch({type: "ADD",id:props.investmentItem._id, name: props.investmentItem.name,price:-1*finalPrice, qty: qty, size:size })
        
        return
    }
    const handleSell=async()=>{
        
        await dispatch({type: "ADD",id:props.investmentItem._id, name:props.investmentItem.name,price:finalPrice, qty: qty, size:size })
        console.log(data)
        return
    }
    let finalPrice=qty*parseInt(option[size]);
    useEffect(()=>{
           setSize(priceRef.current.value)
    },[])
    return (
        <div>
            <div>
                <div className="card mt-3 bg-dark" style={{ "width": "18rem", "maxHeight": "400px" }}>
                    <img src="https://source.unsplash.com/random/100x50/?stocks" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title text-white">{props.investmentItem.name}</h5>
                        <p className="card-text text-white">Something</p>
                        <div className='container w-100'>
                            <input type="number" id="number" onChange={(e)=>setQty(e.target.value)}/>
                            <select className='m-2 h-100 bg-success rounded text-white' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                             {
                                priceOptions.map((data)=>{
                                    if(data){
                                    return <option key={data} value={data}>{data}</option>}
                                })
                                
                             }
                            </select>

                            <div className='d-inline h-100 fs-5 text-white'>
                                ${finalPrice}
                            </div>
                          

                           <div>
                           <div className='btn bg-white text-danger mx-1'onClick={handleBuy}>Buy</div>
                           <div className='btn bg-white text-danger mx-1'onClick={handleSell}>Sell</div>
                           </div>
        
        
        
                   </div>
                        
                       
                    </div>
                    

                </div>
            </div>
        </div>
    )
}
