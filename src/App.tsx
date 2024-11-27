import React, { useReducer, useState } from 'react'
import { Divider, InputAdornment, Typography } from '@mui/material'
import {ArrowRight01Icon, Call02Icon, Mail02Icon, UserCircleIcon} from 'hugeicons-react'
import { InputField } from './components/Inputs/InputField'
import { AuthWrapper } from './components/Wrapper/AuthWrapper'
import Hero from './assets/hero.jpeg'

import './index.scss'
import { RoundButton } from './components/Inputs/RoundButton'
import useAxiosFetch from './hooks/useAxiosFetch'
import { usePaystackPayment } from 'react-paystack';
import swal from 'sweetalert'

export const App = () => {
  const [load, setLoad] = useState(false)
  const {response: data} = useAxiosFetch('/api/admission/price')

  const initState = {
    surname: '',
    othernames: '',
    email: '',
    phone: '',
  }

  const reducerFn = (state: typeof initState, action: any) => {
    switch (action.type) {
      case 'SURNAME':
        return {...state, surname: action?.payload}
      case 'OTHERNAMES':
        return {...state, othernames: action?.payload}
      case 'EMAIL':
        return {...state, email: action?.payload}
      case 'PHONE':
        return {...state, phone: action?.payload}
      case 'RESET':
        return initState
      default:
        return state;
    }
  }

  const [formInput, dispatch] = useReducer(reducerFn, initState)

  // payment //
  const payWithPayStack = usePaystackPayment({
    amount: (data?.amount * 100) || 0,
    currency: 'GHS',
    publicKey: 'pk_test_c84e92927793f9dc742a61b7c5c658db1ae02dc6',
    email: formInput?.email,
    firstname: formInput?.othernames,
    lastname: formInput?.surname,
    phone: formInput?.phone,
    reference: `Admission-Form-${new Date().getTime().toString()}`
  });

  // validations //
  const validateFormData = () => {
    const validatePhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(formInput?.surname === '') { swal('Invalid', 'Please provide surname', 'warning'); return false}
    if(formInput?.othernames === '') { swal('Invalid', 'Please provide othernames', 'warning'); return false }
    if(formInput?.email === '' || !formInput?.email?.match(validateEmail)) { swal('Invalid', 'Please provide valid email address', 'warning'); return false }
    if(formInput?.phone === '' || !formInput?.phone?.match(validatePhone)) { swal('Invalid', 'Please provide a valid phone number', 'warning'); return false }
    return true
  }
  
  const onFormSubmit = async() => {
      const isValid = validateFormData()
      if(isValid){
        setLoad(true)
        payWithPayStack({
          onClose: ()=>{
            swal('Payment Declined', 'Payment process with PayStack has been declined', 'warning').then(()=>window.location.reload())
          },
          onSuccess: ()=>createNewApplicant()
        })
      }
  }

  const createNewApplicant = () => {

  }

  return (
        <AuthWrapper
                title={<Typography sx={{ fontWeight: 500, mb: .5 }} textAlign={'center'} variant='h5'>Admission Application</Typography>}
                subtitle={<Typography sx={{ mb: 3 }} variant={'body1'} fontWeight={400} color='textSecondary' >
                  Please provide a mobile money account number or card details for payment of this Form for 2025 JANUARY ENROLLMENT academic year. 
                  <span style={{color: 'red'}}> NB: Amount Paid is not Refundable</span>
                </Typography>}
                image={Hero}
                order={1}
                imagePosition={'center'}
                textAlign={'left'}
            >
                <div>
                    
                    <InputField variant='outlined'
                        label='Surname' type='text' sx={{mb: 2}}
                        InputProps={{ endAdornment: <InputAdornment position='start'><UserCircleIcon size={20} color='#acacac' /></InputAdornment> }}
                        value={formInput?.surname} 
                        onChange={(e) => { 
                          dispatch({type: 'SURNAME', payload: e?.target?.value})
                        }} 
                        fullWidth
                    />
                    <InputField variant='outlined'
                        label='Other Names' type='text' sx={{mb: 2}}
                        InputProps={{ endAdornment: <InputAdornment position='start'><UserCircleIcon size={20} color='#acacac' /></InputAdornment> }}
                        value={formInput?.othernames} 
                        onChange={(e) => { 
                          dispatch({type: 'OTHERNAMES', payload: e?.target?.value})
                        }} 
                        fullWidth
                    />
                    <InputField variant='outlined'
                        label='Email' type='email' sx={{mb: 2}}
                        InputProps={{ endAdornment: <InputAdornment position='start'><Mail02Icon size={20} color='#acacac' /></InputAdornment> }}
                        value={formInput?.email} 
                        onChange={(e) => { 
                          dispatch({type: 'EMAIL', payload: e?.target?.value})
                        }} 
                        fullWidth
                    />
                    <InputField variant='outlined' sx={{mb: 2.2}}
                        label='Phone Number' type='number'
                        InputProps={{ endAdornment: <InputAdornment position='start'><Call02Icon size={20} color='#acacac' /></InputAdornment> }}
                        value={formInput?.phone} 
                        onChange={(e) => { 
                          dispatch({type: 'PHONE', payload: e?.target?.value})
                        }} 
                        fullWidth
                    />
                    <InputField variant='outlined' isDisabled
                        label='Amount' type='text' sx={{mb: 2}}
                        InputProps={{ startAdornment: <InputAdornment position='start'>GHS</InputAdornment> }}
                        value={data?.amount || 0}
                        fullWidth
                    />
                    <RoundButton
                        endIcon={<ArrowRight01Icon id='end-icon' style={{ transition: 'all .2s ease-in' }} color='#fff' size={20} />}
                        onClick={onFormSubmit}
                        loading={load} size={'medium'}
                        text='Apply Now' variant={'contained'}
                        color='secondary' disableElevation fullWidth
                    />
                    <Divider sx={{my: 2}}><Typography color={'GrayText'} variant={'body2'}>or</Typography></Divider>
                    <RoundButton 
                        endIcon={<ArrowRight01Icon id='end-icon' style={{ transition: 'all .2s ease-in' }} color='#fff' size={20} />}
                        href={'https://potsec.edu.gh/'}
                        loading={load} sx={{ mb: '1rem' }}
                        text='Check Application Status' variant={'outlined'}
                        color='secondary' disableElevation fullWidth
                    />


                </div>
            </AuthWrapper>
 
)
  }
