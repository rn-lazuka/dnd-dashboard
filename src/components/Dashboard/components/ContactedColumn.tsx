import {useDrop} from 'react-dnd'
import {observer} from 'mobx-react-lite'
import {CardStatus, DNDItemTypes} from '../../../enums'
import {dashboardStore} from '../../../store/DashboardStore'
import DraggableCard from './DragableCard'
import CardModel from '../../../store/CardModel'
import {ScrollArea, Stack} from '@mantine/core'

const ContactedColumn = observer(() => {
  const cardsForRender = dashboardStore.cards.filter((card) => card.status === CardStatus.CONTACTED)
  const [{canDrop, isOver}, drop] = useDrop({
    accept: DNDItemTypes.CARD,
    drop: () => ({status: CardStatus.CONTACTED}),
    canDrop: (item: CardModel) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(item.email) && item.status !== CardStatus.CONTACTED
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const isActive = canDrop && isOver

  return (
    <ScrollArea h="100%" ref={drop} style={{border: isActive ? '2px dashed gray' : 'none'}}>
      <Stack p={16}>
        Contacted ({cardsForRender.length})
        {cardsForRender.map((card) => (
          <DraggableCard key={card.id} card={card} />
        ))}
      </Stack>
    </ScrollArea>
  )
})

export default ContactedColumn
