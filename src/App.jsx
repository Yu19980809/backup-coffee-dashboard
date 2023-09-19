import { Suspense } from 'react'
import { ColorModeContext, useMode } from './theme'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Login, MainContent } from './pages'

const App = () => {
  const [ theme, colorMode ] = useMode()
  const user = JSON.parse( localStorage.getItem( 'profile' ) )

  return (
    <ColorModeContext.Provider value={ colorMode }>
      <ThemeProvider theme={ theme }>
        <CssBaseline />

        <Routes>
          <Route path='/login' element={ <Login /> } />
          <Route path='/*' element={ !user ? <Navigate to='/login' /> : <Suspense><MainContent /></Suspense> } />
        </Routes>

      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App