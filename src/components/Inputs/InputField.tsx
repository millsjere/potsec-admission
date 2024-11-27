import { Box, TextField, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import React from 'react'
import swal from 'sweetalert'

const StyledInputField = styled(TextField)(({ size }) => ({
    marginBottom: '1rem',
    '& *': {
        borderRadius: size === 'medium' ? '10px' : '6px'
    },
    '& label.Mui-focused': {
        color: '#ee0704'
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: size === 'medium' ? '10px' : '6px',
        "&.Mui-focused fieldset": {
            border: `1px solid #ee0704`
        }
    }
}))

type InputFieldProps = {
    sx?: object,
    size?: any,
    isSelect?: boolean,
    variant?: any,
    value?: string | number,
    onChange?: (e: any) => void,
    onKeyDown?: (e: any) => void,
    isRequired?: boolean,
    label?: string,
    error?: any,
    children?: any,
    type?: string,
    InputProps?: object,
    inputProps?: object,
    placeholder?: string
    fullWidth?: boolean,
    showTopLabel?: boolean
    isDisabled?:boolean
}

export const InputField = ({ showTopLabel = false, size = 'medium', sx, isSelect, variant, value, onChange, isRequired, label, error, children, type, InputProps, inputProps, placeholder, fullWidth, isDisabled }: InputFieldProps) => {
    return (
        <Box>
            {showTopLabel && <Typography variant='body2' textTransform={'capitalize'} fontSize={'.8rem'} mb={.5} color={'GrayText'}>{label}</Typography>}
            <StyledInputField sx={sx}
                type={type} size={size}
                variant={variant}
                value={value}
                onChange={onChange}
                onKeyDown={(e) => {
                    if (type === 'number') {
                        if (e.key === '-' || e?.key === '+') return swal('Invalid', 'You have entered an invalid input', 'warning')
                    }
                }}
                required={isRequired}
                label={!showTopLabel ? label : null}
                helperText={error?.text}
                error={error?.isError}
                select={isSelect}
                fullWidth={fullWidth}
                InputProps={InputProps}
                inputProps={inputProps}
                placeholder={placeholder}
                defaultValue={isSelect && ''}
                disabled={isDisabled}
            >
                {children}
            </StyledInputField>
        </Box>
    )
}
