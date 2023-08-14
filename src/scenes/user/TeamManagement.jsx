import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Typography, Modal, TextField, RadioGroup, Radio, FormControlLabel, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid'
import { Formik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import { Header, CustomButton } from '../../components'
import { tokens } from '../../theme'
import { fetchMembers, addMember, modifiyMembersRole, deleteMembers } from '../../store/actions'

// 添加成员表单
const Form = ( { handleFormSubmit } ) => {
  const phoneRegExp = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/

  const validationSchema = yup.object().shape({
    name: yup.string().required( 'required' ),
    tel: yup.string()
      .matches( phoneRegExp, 'Phone number is not valid' )
      .required( 'required' ),
    address: yup.string().required( 'required' ),
    password: yup.string().required( 'required' ),
    confirmPassword: yup.string().required( 'required' )
  })
  
  const initialValues = {
    name: '',
    tel: '',
    address: '',
    password: '',
    confirmPassword: '',
    role: 'salesclerk'
  }

  return (
    <Formik
      initialValues={ initialValues }
      validationSchema={ validationSchema }
      onSubmit={ handleFormSubmit }
    >
      { ( { values, errors, touched, handleBlur, handleChange, handleSubmit } ) => (
        <form onSubmit={ handleSubmit }>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat( 4, minmax( 0, 1fr ) )'
            sx={{ '& > div': 'span 4' }}
          >
            <TextField
              type='text'
              variant='filled'
              label='姓名'
              name='name'
              value={ values.name }
              fullWidth
              helperText={ touched.name && errors.name }
              error={ !!touched.name && !!errors.name }
              sx={{ gridColumn: 'span 4', flex: 1 }}
              onChange={ handleChange }
              onBlur={ handleBlur }
            />

            <TextField
              type='text'
              variant='filled'
              label='电话'
              name='tel'
              value={ values.tel }
              fullWidth
              helperText={ touched.tel && errors.tel }
              error={ !!touched.tel && !!errors.tel }
              sx={{ gridColumn: 'span 4' }}
              onChange={ handleChange }
              onBlur={ handleBlur }
            />

            <TextField
              type='text'
              variant='filled'
              label='住址'
              name='address'
              value={ values.address }
              fullWidth
              helperText={ touched.address && errors.address }
              error={ !!touched.address && !!errors.address }
              sx={{ gridColumn: 'span 4' }}
              onChange={ handleChange }
              onBlur={ handleBlur }
            />

            <TextField
              type='text'
              variant='filled'
              label='密码'
              name='password'
              value={ values.password }
              fullWidth
              helperText={ touched.password && errors.password }
              error={ !!touched.password && !!errors.password }
              sx={{ gridColumn: 'span 4' }}
              onChange={ handleChange }
              onBlur={ handleBlur }
            />

            <TextField
              type='text'
              variant='filled'
              label='确认密码'
              name='confirmPassword'
              value={ values.confirmPassword }
              fullWidth
              helperText={ touched.confirmPassword && errors.confirmPassword }
              error={ !!touched.confirmPassword && !!errors.confirmPassword }
              sx={{ gridColumn: 'span 4' }}
              onChange={ handleChange }
              onBlur={ handleBlur }
            />

          </Box>

          <RadioGroup
            row
            name='role'
            defaultValue='salesclerk'
            sx={{ marginTop: '30px' }}
          >
            <FormControlLabel value="salesclerk" control={<Radio color='secondary' />} label="店员" />
            <FormControlLabel value="manager" control={<Radio color='secondary' />} label="经理" />
          </RadioGroup>

          <Box display='flex' justifyContent='center' mt='20px'>
            <Button type='submit' variant='contained' color='secondary'>
              确认创建
            </Button>
          </Box>
        </form>
      ) }
    </Formik>
  )
}

const TeamManagement = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colors = tokens( theme.palette.mode )
  const columns = [
    { field: 'name', headerName: '姓名', flex: 1, cellClassName: 'name-column--cell' },
    { field: 'tel', headerName: '电话', flex: 1 },
    { field: 'address', headerName: '住址', flex: 1.5 },
    {
      field: 'role',
      headerName: '身份',
      flex: 0.5,
      renderCell: ( { row: { role } } ) => (
        <Box
          display='flex'
          justifyContent='center'
          width='80%'
          p='5px'
          backgroundColor={
            role === 'manager'
              ? colors.greenAccent[600]
              : role === 'salesclerk'
              ? colors.greenAccent[700]
              : colors.greenAccent[700]
          }
          borderRadius='4px'
        >
          { role === 'manager' && <AdminPanelSettingsOutlinedIcon /> }
          { role === 'salesclerk' && <SecurityOutlinedIcon /> }

          <Typography color={ colors.grey[100] } sx={{ ml: '5px' }}>
            { role === 'manager' ? '经理' : role === 'salesclerk' ? '店员' : '店员' }
          </Typography>
        </Box>
      )
    }
  ]

  // 添加成员相关参数
  const [ addMemberOpen, setAddMemberOpen ] = useState( false )
  const [ members, setMembers ] = useState( [] )
  const [ loading, setLoading ] = useState( false )

  // 修改身份相关参数
  const [ modifyRoleOpen, setModifyRoleOpen ] = useState( false )
  const [ modifiedRole, setModifiedRole ] = useState( '' )
  const [ selectedRows, setSelectedRows ] = useState( [] )

  // 删除成员相关参数
  const [ deleteMemberOpen, setDeleteMemberOpen ] = useState( false )

  // 请求团队成员数据
  useEffect( () => {
    setLoading( true )
    dispatch( fetchMembers() )
      .then( res => {
        setLoading( false )
        setMembers( res )
      } )
  }, [ dispatch ] )

  // 添加成员
  const handleAddMember = e => {
    const { name, tel, address, password, role } = e
    dispatch( addMember( { name, tel, address, password, role, shopId: '64d4a479120400fab1036b62' } ) )
      .then( res => {
        setAddMemberOpen( false )
        toast.success( '添加成功' )
        setMembers( [ res, ...members ] )
      } )
  }

  // 修改成员身份
  const handleRoleModify = () => {
    dispatch( modifiyMembersRole( selectedRows, modifiedRole ) )
      .then( res => {
        const ids = res.map( item => item._id )
        const modifiedMembers = members.map( item => {
          const index = ids.indexOf( item._id )
          return index === -1 ? item : res[ index ]
        } )

        setModifyRoleOpen( false )
        setSelectedRows( [] )
        setMembers( modifiedMembers )
        toast.success( '修改成功' )
      } )
  }

  // 删除成员
  const handleMemberDelete = () => {
    dispatch( deleteMembers( selectedRows ) )
      .then( () => {
        const result = members.filter( item => !selectedRows.includes( item._id ) )
        setMembers( result )
        setDeleteMemberOpen( false )
        toast.success( '删除成功' )
      } )
  }

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
        <CustomButton colors={ colors } text='添加成员' handleClick={ () => setAddMemberOpen( true ) } />
        <CustomButton colors={ colors } text='修改身份' handleClick={ () => !selectedRows.length ? toast.error( '请选择需要修改的成员' ) : setModifyRoleOpen( true ) } />
        <CustomButton colors={ colors } text='删除成员' handleClick={ () => !selectedRows.length ? toast.error( '请选择要删除的成员' ) : setDeleteMemberOpen( true ) } />
      </Box>
    </GridToolbarContainer>
  )

  return (
    <Box m='20px'>
      {/* HEADER */}
      <Header title='团队管理' subtitle='管理您的团队成员' />

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
          rows={ members }
          getRowId={ row => row._id }
          columns={ columns }
          components={{ Toolbar: CustomToolbar }}
          loading={ loading }
          rowSelectionModel={ selectedRows }
          onRowSelectionModelChange={ id => setSelectedRows( id ) }
        />
      </Box>

      {/* ADD MEMBER MODAL */}
      <Modal
        open={ addMemberOpen }
        onClose={ () => setAddMemberOpen( false ) }
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
            添加成员
          </Typography>

          <Box id='modal-modal-description'>
            <Form handleFormSubmit={ handleAddMember } />
          </Box>
        </Box>
      </Modal>

      {/* MODIFY ROLE MODAL */}
      <Modal
        open={ modifyRoleOpen }
        onClose={ () => setModifyRoleOpen( false ) }
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
            修改成员身份
          </Typography>

          <Box id='modal-modal-description'>
            <FormControl variant='filled' fullWidth>
              <InputLabel id="demo-simple-select-label">身份</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ modifiedRole }
                onChange={ e => setModifiedRole( e.target.value ) }
              >
                <MenuItem value='salesclerk'>店员</MenuItem>
                <MenuItem value='manager'>经理</MenuItem>
              </Select>
            </FormControl>

            <Box display='flex' justifyContent='center' mt='20px'>
              <Button
                type='button'
                variant='contained'
                color='secondary'
                onClick={ handleRoleModify }
              >
                确认修改
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* DELETE MEMBER MODAL */}
      <Modal
        open={ deleteMemberOpen }
        onClose={ () => setDeleteMemberOpen( false ) }
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
            删除成员
          </Typography>

          <Box id='modal-modal-description'>
            <Typography sx={{ textAlign: 'center' }}>确认删除选中的所有成员吗？</Typography>

            <Box display='flex' justifyContent='center' gap='20px' mt='20px'>
              <Button
                type='button'
                variant='contained'
                color='primary'
                onClick={ () => setDeleteMemberOpen( false ) }
              >
                取消
              </Button>

              <Button
                type='button'
                variant='contained'
                color='secondary'
                onClick={ handleMemberDelete }
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

export default TeamManagement