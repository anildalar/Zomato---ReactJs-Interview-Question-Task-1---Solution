import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from './Aside'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  return (
    <>
      <div className="container-fluid">
        <Header />
        <main className="row" style={{minHeight:'600px'}}>
          <div className="col-2">
            <Aside />

          </div>
          <div className="col-10">
            <section>
              <Outlet />
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
