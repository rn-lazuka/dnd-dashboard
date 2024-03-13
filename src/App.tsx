import React from 'react'
import '@mantine/core/styles.css'
import './styles/global.css'
import Dashboard from './components/Dashboard/Dashboard'
import {MantineProvider, Stack} from '@mantine/core'
import {theme} from './styles'


function App() {
  return (
    <MantineProvider theme={theme}>
      <Stack h="100%" p={16}>
        <h1>Dashboard</h1>
        <Dashboard />
      </Stack>
    </MantineProvider>
  )
}

export default App
