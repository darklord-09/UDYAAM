import React,{ useEffect, useState } from 'react'

import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  
  const [orderdata, setorderdata] = useState({});

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
          let response = await res.json()
          console.log("re",response)
          await setorderdata(response)
      })

      // await res.map((data)=>{
      //    console.log(data)
      // })
      

  }
useEffect(() => {
      fetchMyOrder()
  }, []) 


   

  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
      </div>
    )
  }
  
  
  //new code start
  
  
  //new code end
let   totalPrice = data.reduce((total, stock) => total + stock.price,1000000)

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    
    let response = await fetch("http://localhost:5000/api/orderdata", {
    
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        totalbalance : totalPrice 
      })
    });
    
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((stock, index) => (
              <tr>
                <th scope='row' className='text-white'>{index + 1}</th>
                <td className='text-white'>{stock.name}</td>
                <td className='text-white'>{stock.qty}</td>
                <td className='text-white'>{stock.size}</td>
                <td className='text-white'>{stock.price}</td>
                <td ><button type="button" className="btn bg-success " onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>X</button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-white'>Total Balance Remaining: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}