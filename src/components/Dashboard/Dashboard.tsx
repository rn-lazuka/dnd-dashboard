import React from 'react'
import {observer} from 'mobx-react-lite'
import ToContactColumn from './components/ToContactColumn'
import ContactedColumn from './components/ContactedColumn'
import CommittedColumn from './components/CommittedColumn'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {Group} from '@mantine/core'

const Dashboard = observer(() => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Group align="flex-start" gap={0} grow h="100%" style={{overflow:'hidden'}}>
          <ToContactColumn />
          <ContactedColumn />
          <CommittedColumn />
      </Group>
    </DndProvider>
  )
})

export default Dashboard
