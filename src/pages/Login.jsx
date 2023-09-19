import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, useTheme } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
// import { tokens } from '../theme'
import { login } from '../store/actions'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const theme = useTheme()
  // const colors = tokens( theme.palette.mode )

  const validationSchema = yup.object().shape({
    tel: yup.string().required( 'required' ),
    password: yup.string().required( 'required' )
  })

  const initialValues = { tel: '', password: '' }

  const handleFormSubmit = e => {
    const { tel, password } = e
    dispatch( login( tel, password, navigate ) )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Formik
        initialValues={ initialValues }
        validationSchema={ validationSchema }
        onSubmit={ handleFormSubmit }
      > 
        { ( { values, errors, touched, handleBlur, handleChange, handleSubmit } ) => (
          <form onSubmit={ handleSubmit }>
            <Box
              display='flex'
              flexDirection='column'
              gap='30px'
            >
              <TextField
                type='text'
                variant='filled'
                label='手机号'
                name='tel'
                value={ values.tel }
                fullWidth
                helperText={ touched.tel && errors.tel }
                error={ !!touched.tel && !!errors.tel }
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
                onChange={ handleChange }
                onBlur={ handleBlur }
              />
            </Box>

            <Box display='flex' justifyContent='center' mt='20px'>
              <Button
                type='submit'
                variant='contained'
                color='secondary'
              >
                登录
              </Button>
            </Box>
          </form>
        ) }
      </Formik>
    </Box>
  )
}

export default Login