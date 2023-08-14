import { Toaster } from 'react-hot-toast'
import { ColorModeContext, useMode } from './theme'
import { Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Sidebar, Topbar, Dashboard, TeamManagement, UserManagement, UserGroup, UserTag, UserStatistics, OrderManagement, OrderStatistics, CommodityManagement, CommodityClassification, CommodityStatistics, CommodityEdit } from './scenes'

const App = () => {
  const [ theme, colorMode ] = useMode()

  return (
    <ColorModeContext.Provider value={ colorMode }>
      <ThemeProvider theme={ theme }>
        <CssBaseline />

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
              <Route path='/user/tag' element={ <UserTag /> } />
              <Route path='/user/statistics' element={ <UserStatistics /> } />

              {/* ORDER */}
              <Route path='/order/management' element={ <OrderManagement /> } />
              <Route path='/order/statistics' element={ <OrderStatistics /> } />

              {/* COMMODITY */}
              <Route path='/commodity/management' element={ <CommodityManagement /> } />
              <Route path='/commodity/classification' element={ <CommodityClassification /> } />
              <Route path='/commodity/statistics' element={ <CommodityStatistics /> } />
              <Route path='/commodity/edit' element={ <CommodityEdit /> } />
            </Routes>
          </main>

          <Toaster />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App