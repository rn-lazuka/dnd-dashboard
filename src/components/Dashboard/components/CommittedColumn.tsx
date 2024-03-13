import {useDrop} from 'react-dnd'
import {observer} from 'mobx-react-lite'
import {CardStatus, DNDItemTypes} from '../../../enums'
import {dashboardStore} from '../../../store/DashboardStore'
import CardModel from '../../../store/CardModel'
import DraggableCard from './DragableCard'
import {ScrollArea, Stack} from '@mantine/core'

const CommittedColumn = observer(() => {
  const cardsForRender = dashboardStore.cards.filter((card) => card.status === CardStatus.COMMITTED)

  const [{canDrop, isOver}, drop] = useDrop({
    accept: DNDItemTypes.CARD,
    drop: (item: CardModel) => ({...item, status: CardStatus.COMMITTED}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    canDrop: (item: CardModel) => {
      return !!item.comment.trim().length && item.status !== CardStatus.COMMITTED
    }
  })

  const isActive = canDrop && isOver

  return (
    <ScrollArea h="100%" ref={drop} style={{border: isActive ? '2px dashed gray' : 'none'}}>
      <Stack p={16}>
        Committed ({cardsForRender.length})
        {cardsForRender.map((card) => (
          <DraggableCard key={card.id} card={card} />
        ))}
      </Stack>
    </ScrollArea>
  )
})

export default CommittedColumn
