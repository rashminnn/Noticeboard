import { Container, Typography, Box, Card, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AppBarDrawer from '../components/NavBar/AppBarDrawer'
import FormDialog from '../components/FormDialog'
import Table from '../components/Tables/CurrentNoticesTable'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchDataThunk,
  selectNoticesState,
} from '../features/currentNoticesSlice'
import { Columns } from '../components/Tables/CurrentNoticesHeaders'

const Home = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const dispatch = useDispatch()

  const { notices, loading, error } = useSelector(selectNoticesState)

  const handleClickOpen = () => {
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  // useEffect to get the data
  useEffect(() => {
    dispatch(fetchDataThunk())
  }, [dispatch])

  return (
    <>
      <AppBarDrawer></AppBarDrawer>
      <Container maxWidth='lg' sx={{ mt: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button variant='contained' color='primary' onClick={handleClickOpen}>
            Add New Notice
          </Button>
        </Box>
        <Box>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontSize: '1.5rem',
              fontWeight: 700,
              my: 3,
            }}
            component='h1'
          >
            Current Notices
          </Typography>
          <Box>
            <Table
              data={notices}
              columns={Columns}
              EmptyText='No Data found!'
              isFetching={loading}
            />
          </Box>
        </Box>
      </Container>
      <FormDialog handleClose={handleClose} open={dialogOpen} />
    </>
  )
}

export default Home
