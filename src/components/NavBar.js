import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
        <>
            <Nav className="justify-content-center" activeKey="/home">
                <Nav.Item>
                    <Link to="/home">Home</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link eventKey="link-1" to="/order_history_view">Order History View</Link>
                </Nav.Item>
            </Nav>
            
        </>
  )
}
