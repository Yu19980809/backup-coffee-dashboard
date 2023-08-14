import { Box, useTheme } from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid'
import { Header, CustomButton } from '../../components'
import { tokens } from '../../theme'
import { mockDataOrder } from '../../data/mockData'

const OrderManagement = () => {
  const theme = useTheme()
  const colors = tokens( theme.palette.mode )
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'number', headerName: '订单号', flex: 0.5 },
    { field: 'username', headerName: '下单用户', flex: 0.5, cellClassName: 'name-column--cell' },
    { field: 'commodity', headerName: '商品信息', flex: 0.5 },
    { field: 'price', headerName: '支付金额', flex: 0.5 },
    { field: 'payment', headerName: '支付方式', flex: 0.5 },
    { field: 'time', headerName: '支付时间', flex: 1 },
    {
      field: 'operations',
      headerName: '操作',
      flex: 1.5,
      renderCell: () => (
        <Box
          display='flex'
          gap='5px'
          width='50%'
          m='0 auto'
          p='5px'
        >
          <CustomButton colors={ colors } text='详情' />
          <CustomButton colors={ colors } text='编辑' />
          <CustomButton colors={ colors } text='删除' />
        </Box>
      )
    }
  ]

  const CustomToolbar = () => (
    <GridToolbarContainer
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0'
      }}
    >
      <Box>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </Box>
  
      <Box display='flex' gap='10px'>
        <CustomButton colors={ colors } text='批量删除分组' />
      </Box>
    </GridToolbarContainer>
  )

  return (
    <Box m='20px'>
      <Header title='订单管理' subtitle='管理订单' />

      <Box
        height='75vh'
        m='40px 0 0 0'
        sx={{
          '& .MuiDataGrid-root': { border: 'none' },
          '& .MuiDataGrid-cell': { borderBottom: 'none' },
          '& .name-column--cell': { color: colors.greenAccent[300] },
          '& .MuiDataGrid-columnHeaders': { backgroundColor: colors.blueAccent[700], borderBottom: 'none' },
          '& .MuiDataGrid-virtualScroller': { backgroundColor: colors.primary[400] },
          '& .MuiDataGrid-footerContainer': { backgroundColor: colors.blueAccent[700], borderTop: 'none' },
          '& .MuiCheckbox-root': { color: `${ colors.greenAccent[200] } !important` },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: `${ colors.grey[100] } !important` }
        }}
      >
        <DataGrid
          checkboxSelection 
          rows={ mockDataOrder }
          columns={ columns }
          components={{ Toolbar: CustomToolbar }}
        />
      </Box>
    </Box>
  )
}

export default OrderManagement