import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import { Sidebar, Topbar, Dashboard, TeamManagement, UserManagement, UserGroup, UserStatistics, OrderManagement, OrderStatistics, CommodityManagement, CommodityClassification, CommodityStatistics, CouponManagement } from '../scenes'

const MainContent = () => {
  return (
    <div className='app'>
      <Sidebar />

      <main className='content'>
        <Topbar />

        <Routes>
          {/* DASHBOARD */}
          <Route path='/' element={ <Dashboard /> } />

          {/* USER */}
          <Route path='/user/team' element={ <TeamManagement /> } />
          <Route path='/user/management' element={ <UserManagement /> } />
          <Route path='/user/group' element={ <UserGroup /> } />
          <Route path='/user/statistics' element={ <UserStatistics /> } />

          {/* ORDER */}
          <Route path='/order/management' element={ <OrderManagement /> } />
          <Route path='/order/statistics' element={ <OrderStatistics /> } />

          {/* COMMODITY */}
          <Route path='/commodity/management' element={ <CommodityManagement /> } />
          <Route path='/commodity/classification' element={ <CommodityClassification /> } />
          <Route path='/commodity/statistics' element={ <CommodityStatistics /> } />

          {/* OTHERS */}
          <Route path='/coupon/management' element={ <CouponManagement /> } />
        </Routes>
      </main>

      <Toaster />
    </div>
  )
}

export default MainContent