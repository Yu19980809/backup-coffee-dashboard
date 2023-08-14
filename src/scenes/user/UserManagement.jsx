import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, Button, Modal, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid'
import toast from 'react-hot-toast'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Header, CustomButton } from '../../components'
import { tokens } from '../../theme'
import { fetchUsers, giveVip, fetchUserGroups, setUserGroup } from '../../store/actions'

const UserManagement = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colors = tokens( theme.palette.mode )

  // 用户数据
  const [ users, setUsers ] = useState( [] )

  // 选中的行
  const [ selectedRows, setSelectedRows ] = useState( [] )

  // 赠送会员相关参数
  const [ giveVipOpen, setGiveVipOpen ] = useState( false )
  const [ vipStartDate, setVipStartDate ] = useState( dayjs( new Date() ) )
  const [ vipEndDate, setVipEndDate ] = useState( dayjs( new Date().getTime() + 3 * 24 * 60 * 60 * 1000 ) )
  
  // 设置分组相关参数
  const [ groupOpen, setGroupOpen ] = useState( false )
  const [ groups, setGroups ] = useState( [] )
  const [ selectedGroup, setSelectedGroup ] = useState( '' )

  // 表格相关参数
  const columns = [
    { field: 'name', headerName: '姓名', flex: 0.5, cellClassName: 'name-column--cell' },
    { field: 'vip', headerName: '会员', flex: 0.5 },
    { field: 'vip_end_date', headerName: '会员到期时间', flex: 1 },
    { field: 'groups', headerName: '分组', flex: 1 },
    { field: 'tel', headerName: '电话', flex: 1 },
    { field: 'money', headerName: '账户余额', flex: 0.5 },
  ]

  const rows = users.map( item => {
    const obj = {
      _id: item._id,
      name: item.name,
      tel: item.tel,
      money: item.money,
      groups: item.groups.length === 0 ? '无' : item.groups.join( ', ' ),
      vip: item.vip === 'yes' ? '是' : '否',
      vip_end_date: item.vip === 'yes' ? item.vip_end_date : '无'
    }

    return obj
  } )

  // 请求用户数据
  useEffect( () => {
    dispatch( fetchUsers() ).then( res => setUsers( res ) )
  }, [ dispatch ] )

  // 点击赠送会员按钮
  const handleClickGiveVip = () => {
    // 判断是否勾选了会员用户
    let isSelectedVip = false
    const userIds = users.map( user => user._id )
    selectedRows.forEach( item => {
      const index = userIds.indexOf( item )
      if ( index !== -1 && users[ index ].vip === 'yes' ) isSelectedVip = true
    } )

    // 情况判断
    if ( selectedRows.length === 0 ) {
      toast.error( '请选择要赠送的用户' )
    } else if ( isSelectedVip ) {
      toast.error( '只能选择非会员用户' )
    } else {
      setGiveVipOpen( true )
    }
  }

  // 赠送会员
  const handleGiveVip = () => {
    const startDate = dayjs( vipStartDate ).format( 'YYYY-MM-DD' )
    const endDate = dayjs( vipEndDate ).format( 'YYYY-MM-DD' )
    dispatch( giveVip( { idList: selectedRows, startDate, endDate } ) )
      .then( res => {
        const idList = res.map( item => item._id )
        const result = users.map( item => idList.indexOf( item._id ) === -1 ? item : { ...res[ idList.indexOf( item._id ) ], groups: item.groups } )
        setUsers( result )
        setGiveVipOpen( false )
        setSelectedRows( [] )
        toast.success( '赠送成功' )
      } )
  }

  // 请求分组列表数据
  useEffect( () => {
    dispatch( fetchUserGroups() ).then( res => setGroups( res ) )
  }, [ dispatch ] )

  // 设置用户分组
  const handleGroup = () => {
    dispatch( setUserGroup( { idList: selectedRows, group: selectedGroup } ) )
      .then( () => {
        setGroupOpen( false )
        setSelectedRows( [] )
        setSelectedGroup( '' )
        toast.success( '设置成功' )
        dispatch( fetchUsers() ).then( res => setUsers( res ) )
      })
  }

  // 自定义表格工具栏
  const CustomToolbar = () => {
    const theme = useTheme()
    const colors = tokens( theme.palette.mode )
  
    return (
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
          <CustomButton colors={ colors } text='批量赠送会员' handleClick={ handleClickGiveVip } />
          <CustomButton colors={ colors } text='批量赠送优惠券' />
          <CustomButton colors={ colors } text='批量设置分组' handleClick={ () => !selectedRows.length ? toast.error( '请选择要设置分组的用户' ) : setGroupOpen( true ) } />
        </Box>
      </GridToolbarContainer>
    )
  }

  return (
    <Box m='20px'>
      {/* HEADER */}
      <Header title='用户管理' subtitle='管理您的用户' />

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
          rows={ rows }
          getRowId={ row => row._id }
          columns={ columns }
          components={{ Toolbar: CustomToolbar }}
          rowSelectionModel={ selectedRows }
          onRowSelectionModelChange={ id => setSelectedRows( id ) }
        />
      </Box>

      {/* GIVE VIP MODAL */}
      <Modal
        open={ giveVipOpen }
        onClose={ () => setGiveVipOpen( false ) }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 550,
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
            批量赠送会员
          </Typography>

          <Box id='modal-modal-description'>
            <Box display='flex' justifyContent='space-between'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="开始日期"
                    disabled
                    value={ vipStartDate }
                    onChange={ newValue => setVipStartDate( newValue ) }
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="结束日期"
                    value={ vipEndDate }
                    onChange={ newValue => setVipEndDate( newValue ) }
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>

            <Box display='flex' justifyContent='center' gap='20px' mt='20px'>
              <Button
                type='button'
                variant='contained'
                color='primary'
                onClick={ () => setGiveVipOpen( false ) }
              >
                取消
              </Button>

              <Button
                type='button'
                variant='contained'
                color='secondary'
                onClick={ handleGiveVip }
              >
                确认
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* GROUP MODAL */}
      <Modal
        open={ groupOpen }
        onClose={ () => setGroupOpen( false ) }
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
            批量设置分组
          </Typography>

          <Box id='modal-modal-description'>
            <FormControl variant='filled' fullWidth>
              <InputLabel id="demo-simple-select-label">分组</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ selectedGroup }
                onChange={ e => setSelectedGroup( e.target.value ) }
              >
                { groups.map( item => (
                  <MenuItem key={ item._id } value={ item._id }>{ item.name }</MenuItem>
                ) ) }
              </Select>
            </FormControl>

            <Box display='flex' justifyContent='center' gap='20px' mt='20px'>
              <Button
                type='button'
                variant='contained'
                color='primary'
                onClick={ () => setGroupOpen( false ) }
              >
                取消
              </Button>

              <Button
                type='button'
                variant='contained'
                color='secondary'
                onClick={ handleGroup }
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

export default UserManagement