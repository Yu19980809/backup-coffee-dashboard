import { Box, useTheme } from '@mui/material'
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined'
import { Header, LineChart } from '../../components'
import { tokens } from '../../theme'

const OrderStatistics = () => {
  const theme = useTheme()
  const colors = tokens( theme.palette.mode )

  const CustomBox = ( { icon, text, num } ) => (
    <Box
      display='flex'
      alignItems='center'
      height='10vh'
      sx={{ flex: '1', backgroundColor: colors.primary[400], borderRadius: '5px' }}
    >
      { icon }
      { text }: { num }
    </Box>
  )

  return (
    <Box m='20px'>
      <Header title='订单统计' subtitle='查看订单统计数据' />

      <Box height='75vh' m='40px 0 0 0'>
        {/* 简易信息 */}
        <Box display='flex' alignItems='center' gap='10px'>
          <CustomBox icon={ <ContactsOutlinedIcon /> } text='订单数' num='122' />
          <CustomBox icon={ <ContactsOutlinedIcon /> } text='订单金额' num='4399' />
          <CustomBox icon={ <ContactsOutlinedIcon /> } text='退款订单数' num='0' />
          <CustomBox icon={ <ContactsOutlinedIcon /> } text='退款金额' num='0' />
        </Box>

        {/* 线型图 */}
        <Box height='60vh'>
          <LineChart />
        </Box>
      </Box>
    </Box>
  )
}

export default OrderStatistics