import React, { useEffect, useState } from 'react'
import { Tab, Table, Tabs } from 'react-bootstrap'
import { BASE_URL } from '../helpers/helper';

export default function OrderHistoryView() {
  //1. State/Hook Area
  const [pastOrders,setPastOrders] = useState([]);
  const [upcommingOrders,setUpcommingOrders] = useState([]);
  const [allOrders,setAllOrders] = useState([]);
  const [error,setError] = useState(false);
  useEffect(()=>{
    //After the Page load
    console.log('Page Loaded Successfully');
    getOrders();
  },[]);
  //2. Function Defination area

  let getOrders = ()=>{
      fetch(`${BASE_URL}/test/orders`)
      .then(res=>res.json())
      .then(data=>{
        //console.log(data.orders);
        data.orders.sort(function(a,b){
          return b.arrives_at_utc - a.arrives_at_utc
        })
        //console.log(data.orders);
        //All Order Filtering according arrives_at_utc
        setAllOrders(data.orders);

        setPastOrders(data.orders.filter((cv,idx,arr)=>{
          //Past Orders
            return cv.arrives_at_utc < + new Date();
        }));

        setUpcommingOrders(data.orders.filter((cv,idx,arr)=>{
          // Upcomming
          return cv.arrives_at_utc > + new Date();
        }));
      })
      .catch(error=>{
        console.log(error);
        setError(true);
      });
  }


  //3. Return statement
  return (
    <>  
      <h1 className="text-center">Order History View</h1>
      {
        error === true ? <div className="alert alert-danger" role="alert">Error :- 503 Service unavailable</div> :
        <Tabs defaultActiveKey="all_orders" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="past_orders" title="Past Orders">
          <h5 className="text-center">Past Orders</h5>
          {console.log('Upcomming Orders',pastOrders)}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
                <th>Order Number</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {
                pastOrders.length > 0 && 
                pastOrders.map((cv,idx,arr)=>{
                  var date = new Date(cv.arrives_at_utc);
                  return (
                          <tr key={idx}>
                            <td>
                              <span className="badge rounded-pill text-bg-success bg-succeess text-success">Delivered</span>
                            </td>
                            <td>{ date.toLocaleString("en-US", {weekday: "long",day:'numeric',month:'numeric',year:'numeric'}) }</td>
                            <td>{ date.toLocaleString("en-US",  {hour: "numeric",minute: "numeric"}) }</td>
                            <td>{cv.order_id}</td>
                            <td>{cv.total_paid}</td>
                          </tr>
                        );
                })
              }
              
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="upcomming_orders" title="Upcomming Orders">
          <h5 className="text-center">Upcomming Orders</h5>
          {console.log('Upcomming Orders',upcommingOrders)}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
                <th>Order Number</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {
                upcommingOrders.length > 0 && 
                upcommingOrders.map((cv,idx,arr)=>{
                  var date = new Date(cv.arrives_at_utc);
                  return (
                          <tr key={idx}>
                            <td>
                              <span className="badge rounded-pill text-primary">Confirmed</span>
                            </td>
                            <td>{ date.toLocaleString("en-US", {weekday: "long",day:'numeric',month:'numeric',year:'numeric'}) }</td>
                            <td>{ date.toLocaleString("en-US",  {hour: "numeric",minute: "numeric"}) }</td>
                            <td>{cv.order_id}</td>
                            <td>{cv.total_paid}</td>
                          </tr>
                        );
                })
              }
              
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="all_orders" title="All Orders">
          <h5 className="text-center">All Orders</h5>
          {console.log('all Orders',allOrders)}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
                <th>Order Number</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {
                allOrders.length > 0 && 
                allOrders.map((cv,idx,arr)=>{
                  var date = new Date(cv.arrives_at_utc);
                  return (
                          <tr key={idx}>
                            <td>{cv.arrives_at_utc === null ?'Cancelled':(cv.arrives_at_utc < + new Date() ?<span className="badge rounded-pill text-bg-success bg-succeess text-success">Delivered</span>:<span className="badge rounded-pill text-primary">Confirmed</span>) }</td>
                            <td>{ date.toLocaleString("en-US", {weekday: "long",day:'numeric',month:'numeric',year:'numeric'}) }</td>
                            <td>{ date.toLocaleString("en-US",  {hour: "numeric",minute: "numeric"}) }</td>
                            <td>{cv.order_id}</td>
                            <td>{cv.total_paid}</td>
                          </tr>
                        );
                })
              }
              
            </tbody>
          </Table>
        </Tab>
      </Tabs> 
      }
    </>
  )
}
