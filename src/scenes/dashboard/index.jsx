import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
// import EmailIcon from '@mui/icons-material/Email'
// import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
// import PersonAddIcon from '@mui/icons-material/PersonAdd'
// import TrafficIcon from '@mui/icons-material/Traffic'
// import LineChart from '../../components/LineChart'
// import GeographyChart from '../../components/GeographyChart'
// import BarChart from '../../components/BarChart'
// import StatBox from '../../components/StatBox'
// import ProgressCircle from '../../components/ProgressCircle'
import { Header } from '../../components'
import { tokens } from '../../theme'
// import { mockTransactions } from '../../data/mockData'

const index = () => {
  const theme = useTheme()
  const colors = tokens( theme.palette.mode )

  return (
    <Box m='20px'>
      {/* HEADER */}
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Header title='DASHBOARD' subtitle='Welcome to your dashboard' />

        <Button
          sx={{
            padding: '10px 20px',
            color: colors.grey[100],
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: colors.blueAccent[700],
            '&.MuiButtonBase-root:hover': { background: colors.blueAccent[500] }
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: '10px' }} />
          Download Reports
        </Button>
      </Box>

      {/* GRID & CHARTS */}
    </Box>
  )
}

export default index