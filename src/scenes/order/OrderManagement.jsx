import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, Modal, Button, useTheme } from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid'
import toast from 'react-hot-toast'
import { Header, CustomButton } from '../../components'
import { tokens } from '../../theme'
import { fetchOrders, deleteOrder, deleteOrders } from '../../store/actions'

const OrderManagement = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colors = tokens( theme.palette.mode )

  // 勾选的行
  const [ selectedRows, setSelectedRows ] = useState( [] )

  // 当前点击的行
  const [ clickedRow, setClickedRow ] = useState( {} )

  // 订单列表
  const [ orders, setOrders ] = useState( [] )

  // 删除（单个）订单相关参数
  const [ deleteOrderOpen, setDeleteOrderOpen ] = useState( false )

  // 批量删除订单相关参数
  const [ deleteOrdersOpen, setDeleteOrdersOpen ] = useState( false )

  // 请求订单列表
  useEffect( () => {
    dispatch( fetchOrders() ).then( res => setOrders( res ) )
  }, [ dispatch ] )

  // 删除（单个）订单
  const handleDeleteOrder = () => {
    dispatch( deleteOrder( clickedRow._id ) )
      .then( () => {
        const newOrders = orders.filter( item => item._id !== clickedRow._id )
        setOrders( newOrders )
        setDeleteOrderOpen( false )
        setClickedRow( {} )
        toast.success( '删除成功' )
      } )
  }

  // 批量删除订单
  const handleDeleteOrders = () => {
    dispatch( deleteOrders( selectedRows) )
      .then( () => {
        const newOrders = orders.filter( item => !selectedRows.includes( item._id ) )
        setOrders( newOrders )
        setDeleteOrdersOpen( false )
        setSelectedRows( [] )
        toast.success( '删除成功' )
      } )
  }

  // 表格相关参数
  const columns = [
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
          <CustomButton colors={ colors } text='删除' handleClick={ () => setDeleteOrderOpen( true ) } />
        </Box>
      )
    }
  ]

  // 自定义表格工具栏
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
        <CustomButton colors={ colors } text='批量删除' handleClick={ () => !selectedRows.length ? toast.error( '请选择要删除的订单' ) : setDeleteOrdersOpen( true ) } />
      </Box>
    </GridToolbarContainer>
  )

  return (
    <Box m='20px'>
      {/* HEADER */}
      <Header title='订单管理' subtitle='管理订单' />

      {/* DATA GRID */}
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
          disableRowSelectionOnClick 
          rows={ orders }
          getRowId={ row => row._id }
          columns={ columns }
          components={{ Toolbar: CustomToolbar }}
          rowSelectionModel={ selectedRows }
          onRowSelectionModelChange={ id => setSelectedRows( id ) }
          onRowClick={ e => setClickedRow( e.row ) }
        />
      </Box>

      {/* DELETE ORDER MODAL */}
      <Modal
        open={ deleteOrderOpen }
        onClose={ () => setDeleteOrderOpen( false ) }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            p: 4,
            bgcolor: colors.primary[400],
            border: '2px solid #000',
            borderRadius: '10px',
            boxShadow: 24,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: '10px', textAlign: 'center' }}
          >
            删除提示
          </Typography>

          <Box id='modal-modal-description'>
            <Typography sx={{ textAlign: 'center' }}>确认删除当前订单吗？</Typography>

            <Box display='flex' justifyContent='center' gap='20px' mt='20px'>
              <Button
                type='button'
                variant='contained'
                color='primary'
                onClick={ () => setDeleteOrderOpen( false ) }
              >
                取消
              </Button>

              <Button
                type='button'
                variant='contained'
                color='secondary'
                onClick={ handleDeleteOrder }
              >
                确认
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* DELETE ORDERS MODAL */}
      <Modal
        open={ deleteOrdersOpen }
        onClose={ () => setDeleteOrdersOpen( false ) }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            p: 4,
            bgcolor: colors.primary[400],
            border: '2px solid #000',
            borderRadius: '10px',
            boxShadow: 24,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: '10px', textAlign: 'center' }}
          >
            删除提示
          </Typography>

          <Box id='modal-modal-description'>
            <Typography sx={{ textAlign: 'center' }}>确认删除选中的所有订单吗？</Typography>

            <Box display='flex' justifyContent='center' gap='20px' mt='20px'>
              <Button
                type='button'
                variant='contained'
                color='primary'
                onClick={ () => setDeleteOrdersOpen( false ) }
              >
                取消
              </Button>

              <Button
                type='button'
                variant='contained'
                color='secondary'
                onClick={ handleDeleteOrders }
              >
                确认
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default OrderManagement