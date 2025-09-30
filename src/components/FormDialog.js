import * as React from 'react'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import {
  Container,
  Typography,
  Box,
  InputLabel,
  Grid,
  CircularProgress,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
// import { uploadFiletoFirebase } from '../firebase'
import uploadFiletoFirebase from '../scripts/uploadFile'
import { addNotice } from '../scripts/firestore'
import { useDispatch } from 'react-redux'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { fetchDataThunk } from '../features/currentNoticesSlice'

const FormField = ({ children }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: '30% 70%',
      m: 2,
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 4,
    }}
  >
    {children}
  </Box>
)

export default function FormDialog({ open, handleClose }) {
  const [fileUploaded, setFileUploaded] = useState(false)
  const [fileUrl, setFileUrl] = useState(null)
  const [uploadingImg, setUploadingImg] = useState(false)

  const dispatch = useDispatch()

  const { handleSubmit, control, watch, getValues, resetField, reset } =
    useForm({
      defaultValues: {
        title: '',
        file: null,
      },
    })

  const onSubmit = async (data) => {
    console.log(data)
    await addNotice({
      title: data.title,
      file: fileUrl,
      createdAt: new Date().toISOString(),
      removedAt: null,
    })
    handleClose()
    reset()
    dispatch(fetchDataThunk())
  }

  const fileSelected = watch('file')
  console.log({ fileSelected })

  useEffect(() => {
    if (fileUrl) {
      setUploadingImg(false)
    }
  }, [fileUrl])

  useEffect(() => {
    if (!fileSelected) return
    setUploadingImg(true)
    if (getValues('file')) {
      uploadFiletoFirebase(getValues('file'), getValues('file')?.name).then(
        (url) => {
          console.log(url)
          if (typeof url === 'string') {
            setFileUrl(url)
            setFileUploaded(true)
          }
        }
      )
    }
  }, [fileSelected])

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add New Notice</DialogTitle>
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <FormField>
              <InputLabel>Notice Title</InputLabel>
              <Controller
                name='title'
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    helperText={error ? error.message : null}
                    size='small'
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    variant='outlined'
                    multiline
                    rows={2}
                  />
                )}
              />
            </FormField>
            <FormField>
              <InputLabel>Image / Pdf</InputLabel>
              {!fileUploaded ? (
                <Box>
                  <Controller
                    control={control}
                    name={'file'}
                    rules={{ required: 'File is required' }}
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <Button
                          variant='contained'
                          component='label'
                          sx={{
                            minWidth: '240px',
                            backgroundColor: '#dcdde1',
                            color: 'black',
                            '&:hover': {
                              backgroundColor: '#dcdde1',
                              boxShadow: 'none',
                            },
                            '&:active': {
                              boxShadow: 'none',
                              backgroundColor: '#dcdde1',
                            },
                          }}
                        >
                          {uploadingImg ? (
                            <CircularProgress />
                          ) : (
                            <>{'Upload File'}</>
                          )}
                          <input
                            {...field}
                            value={undefined}
                            onChange={async (e) => {
                              onChange(e.currentTarget.files?.[0])
                            }}
                            type='file'
                            accept='image/png, image/gif, image/jpeg'
                            hidden
                            disabled={uploadingImg}
                          />
                        </Button>
                      )
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{getValues('file')?.name}</Typography>
                  <IconButton
                    edge='end'
                    onClick={() => {
                      resetField('file')
                      setFileUrl(null)
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Box>
              )}
            </FormField>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} disabled={uploadingImg}>
              Cancel
            </Button>
            <Button variant='contained' type='submit' disabled={uploadingImg}>
              Publish
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
