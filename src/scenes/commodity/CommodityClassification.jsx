import { Box, Switch, useTheme } from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid'
import { Header, CustomButton } from '../../components'
import { tokens } from '../../theme'
import { mockDataCommodityCategory } from '../../data/mockData'

const CommodityClassification= () => {
  const theme = useTheme()
  const colors = tokens( theme.palette.mode )
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: '分类名称', flex: 1, cellClassName: 'name-column--cell' },
    { field: 'num', headerName: '商品数量'},
    {
      field: 'status',
      headerName: '显示状态',
      flex: 0.5,
      renderCell: ( { row: { status } } ) => (
        <Box
          display='flex'
          justifyContent='center'
          width='50%'
          m='0 auto'
          p='5px'
        >
          <Switch
            checked={ status === 'on' }
            color='secondary'
            onChange={ () => console.log( 'switch change' ) }
          />
        </Box>
      )
    },
    {
      field: 'operations',
      headerName: '操作',
      flex: 1,
      renderCell: () => (
        <Box
          display='flex'
          justifyContent='center'
          gap='10px'
          width='80%'
          m='0 auto'
          p='5px'
        >
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
  
      <Box display='flex'>
        <CustomButton colors={ colors } text='添加分类' />
      </Box>
    </GridToolbarContainer>
  )

  return (
    <Box m='20px'>
      <Header title='商品分类' subtitle='商品分类信息' />

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
          rows={ mockDataCommodityCategory }
          columns={ columns }
          components={{ Toolbar: CustomToolbar }}
        />
      </Box>
    </Box>
  )
}

export default CommodityClassification