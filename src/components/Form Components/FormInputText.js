import React from 'react'
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'

export const FormInputText = ({ name, control, label, autoComplete }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size='small'
          margin="normal"
          error={!!error}
          onChange={onChange}
          autoComplete={autoComplete}
          value={value}
          fullWidth
          label={label}
          variant='outlined'
        />
      )}
    />
  )
}
