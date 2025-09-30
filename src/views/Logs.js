import { Container, Typography, Box, Card, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AppBarDrawer from '../components/NavBar/AppBarDrawer'
import FormDialog from '../components/FormDialog'
import Table from '../components/Tables/pastNoticesTable'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchDataThunk,
  selectNoticesState,
} from '../features/currentNoticesSlice'
import { Columns } from '../components/Tables/pastNoticesHeaders'
import {
  fetchPastNoticesThunk,
  selectPastNoticesState,
} from '../features/pastNoticesSlice'

const Logs = () => {
  const dispatch = useDispatch()

  const { notices, loading, error } = useSelector(selectPastNoticesState)

  // useEffect to get the data
  useEffect(() => {
    console.log('this is the past notices slice')
    dispatch(fetchPastNoticesThunk())
  }, [dispatch])

  return (
    <>
      <AppBarDrawer></AppBarDrawer>
      <Container maxWidth='lg' sx={{ mt: 10 }}>
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
            Removed Notices
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
    </>
  )
}

export default Logs
