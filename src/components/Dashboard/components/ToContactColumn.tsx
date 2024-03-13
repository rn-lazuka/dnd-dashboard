import {useDrop} from 'react-dnd'
import {observer} from 'mobx-react-lite'
import {dashboardStore} from '../../../store/DashboardStore'
import {CardStatus, DNDItemTypes} from '../../../enums'
import CardModel from '../../../store/CardModel'
import DraggableCard from './DragableCard'
import {Button, ScrollArea, Stack} from '@mantine/core'

const ToContactColumn = observer(() => {
  const cardsForRender = dashboardStore.cards.filter((card) => card.status === CardStatus.TO_CONTACT)
  const handleAddCard = () => {
    dashboardStore.addCard()
  }

  const [{canDrop, isOver}, drop] = useDrop({
    accept: DNDItemTypes.CARD,
    drop: (item: CardModel, monitor) => ({...item, status: CardStatus.TO_CONTACT}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    canDrop: (item: CardModel) => {
      return item.status !== CardStatus.TO_CONTACT
    }
  })

  const isActive = canDrop && isOver

  return (
    <ScrollArea h="100%" ref={drop} style={{border: isActive ? '2px dashed gray' : 'none'}}>
      <Stack p={16}>
        To Contact ({cardsForRender.length})
        {cardsForRender.map((card) => (
          <DraggableCard key={card.id} card={card} />
        ))}
        <Button onClick={handleAddCard} variant="light">Add Card</Button>
      </Stack>
    </ScrollArea>
  )
})

export default ToContactColumn
