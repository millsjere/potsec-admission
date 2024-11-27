import React from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import Skills from '../../assets/hero.jpeg'


// AuthWrapper: 
// This is used to wrap auth pages: Login, ForgotPassword, Resetpassword and Signup

type AuthWrapperProps = {
    children: React.ReactNode,
    title: React.ReactNode,
    subtitle: React.ReactNode,
    image?: any,
    order?: number,
    imagePosition?: string
    textAlign?: any
    staff?: boolean
}

export const AuthWrapper = ({ children, staff = false, title, subtitle, image, order = 1, imagePosition = 'center', textAlign = 'center' }: AuthWrapperProps) => {
    const navigate = useNavigate()
    return (
        <div>
            {
                staff ?
                    <Box height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{
                        bgcolor: '#ededed'
                    }} >
                        <Grid container sx={{ width: '65%', boxShadow: '0 2px 20px rgba(0,0,0, 12%)' }} spacing={3}>
                            <Grid item sm={5.5} sx={{ bgcolor: 'grey', backgroundSize: 'cover', backgroundPosition: 'right', backgroundImage: `url(${Skills})` }}>
                                <Box height={'100%'} />
                            </Grid>
                            <Grid item sm={6.5} sx={{ height: '40rem', bgcolor: '#fff', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box width={'80%'} m={'0 auto'} textAlign={'center'}>
                                    <img src={Logo} width={120} alt="logo" style={{ cursor: 'pointer', margin: '0 auto', marginBottom: '1rem' }} onClick={() => navigate('/')} />
                                    {title}
                                    {subtitle}
                                    {children}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    :
                    <Box height={'100vh'} display={'flex'} flexDirection={order === 2 ? 'row-reverse' : 'row'}>
                        <Box width={{ sm: '50%', md: '40%', lg: '40%' }} p={10} sx={{
                            display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' }, flexDirection: 'column', justifyContent: 'space-between',
                            backgroundSize: 'cover', backgroundImage: `linear-gradient(0deg, rgba(0,0,0,40%), rgba(0,0,0, 10%)), url(${image})`,
                            backgroundPosition: imagePosition
                        }}>
                            <p></p>
                            <Box p={4} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255, 10%)', borderRadius: '20px', 'backdrop-filter': 'blur(20px)' }}>
                                <Typography variant='h5' mb={2} textTransform={'capitalize'} fontWeight={500}>Prince Osei-Tutu Skills & <br />Enterpreneurial College - POTSEC</Typography>
                                <Typography variant='body2' fontWeight={300} sx={{ letterSpacing: 2 }}>ADMISSIONS - {new Date().getFullYear()}</Typography>
                            </Box>
                        </Box>
                        <Box width={{ xs: '100%', sm: '60%', lg: '60%' }} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: '2rem'
                        }}>
                            <p></p>
                            <Box width={{ xs: '80%', sm: '80%', md: '80%', lg: '50%' }} textAlign={textAlign}>
                                <span>
                                    <img src={Logo} width={120} alt="logo" style={{ cursor: 'pointer', margin: '0 auto', marginBottom: '1rem' }} onClick={() => navigate('/')} />
                                </span>
                                {title}
                                {subtitle}
                                {children}
                            </Box>

                            <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: 'row' }} justifyContent={'space-between'} width={{ xs: '80%', sm: '80%', md: '80%', lg: '50%' }}>
                                <Typography variant='body2' color={'GrayText'} sx={{ textAlign: 'center' }}> © {new Date().getFullYear()} POTSEC</Typography>
                                <Link to={'https://potsec.edu.gh'}>
                                    <Typography variant='body2' color={'GrayText'} >About Us</Typography>
                                </Link>
                            </Stack>
                        </Box>
                    </Box>
            }
        </div>
    )
}