import {useDrag} from 'react-dnd'
import {observer} from 'mobx-react-lite'
import {CardStatus, DNDItemTypes} from '../../../enums'
import CardModel from '../../../store/CardModel'
import {dashboardStore} from '../../../store/DashboardStore'
import {ActionIcon, Card, Grid, Input, rem, Stack, Switch, Textarea, useMantineTheme} from '@mantine/core'
import {IconAt, IconThumbUp, IconThumbDown, IconTrash} from '@tabler/icons-react'

interface CardProps {
  card: CardModel;
}

const DraggableCard = observer(({card}: CardProps) => {
  const theme = useMantineTheme();
  const handleChangeEmail = (email: string) => {
    dashboardStore.changeEmail(card.id, email)
  }
  const handleChangeComment = (comment: string) => {
    dashboardStore.changeComment(card.id, comment)
  }
  const handleChangeDoneStatus= (isDone: boolean) => {
    dashboardStore.changeIsDoneStatus(card.id, isDone)
  }
  const handleDeleteCard = () => {
    dashboardStore.deleteCard(card.id)
  }

  const handleMoveCard = (card: CardModel, newStatus: CardStatus) => {
    let newCardData = {...card, status: newStatus}
    if (newStatus === CardStatus.TO_CONTACT) {
      newCardData = {id: card.id, comment: '', email: '', status: newStatus, doneStatus: false}
    }
    if (newStatus === CardStatus.CONTACTED) {
      newCardData = {id: card.id, comment: '', email: card.email, status: newStatus, doneStatus: false}
    }
    dashboardStore.moveCard(newCardData)
  }

  const [{isDragging}, drag] = useDrag(() => ({
    type: DNDItemTypes.CARD,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    item: card,
    end: (_, monitor) => {
      const dropResult = monitor.getDropResult() as CardModel
      if (dropResult) {
        handleMoveCard(card, dropResult.status)
      }
    }
  }))

  return (
    <Card
      ref={drag}
      shadow="sm"
      padding="16"
      radius="md"
      mih={95}
      withBorder
      opacity={isDragging ? 0.5 : 1}
      style={{cursor: 'move'}}
      pos="relative"
    >
      <ActionIcon
        variant="default"
        size="sm"
        aria-label="Delete"
        pos="absolute"
        right={8}
        top={8}
        onClick={handleDeleteCard}
      >
        <IconTrash stroke={1.5} />
      </ActionIcon>
      <Grid>
        {card.status !== CardStatus.TO_CONTACT &&
          <Grid.Col span={12}>
            Email: {card.email}
          </Grid.Col>
        }
        {card.status === CardStatus.TO_CONTACT &&
          <Grid.Col span={12}>
            <Stack>
              <Input.Wrapper label="Email">
                <Input
                  placeholder="Enter email"
                  leftSection={<IconAt size={16} />}
                  value={card.email}
                  onChange={(e) => handleChangeEmail(e.target.value)}
                />
              </Input.Wrapper>
            </Stack>
          </Grid.Col>
        }
        {card.status === CardStatus.CONTACTED &&
          <Grid.Col span={12}>
            <Textarea
              label="Comment"
              placeholder="Enter your comment"
              value={card.comment}
              onChange={(e) => handleChangeComment(e.target.value)}
            />
          </Grid.Col>
        }
        {card.status === CardStatus.COMMITTED &&
          <>
            <Grid.Col span={12}>
              Comment: {card.comment}
            </Grid.Col>
            <Grid.Col span={12}>
              <Switch
                checked={card.doneStatus}
                onChange={(event) => handleChangeDoneStatus(event.currentTarget.checked)}
                color="teal"
                size="md"
                label={card.doneStatus ? 'Success' : 'Fail'}
                thumbIcon={
                  card.doneStatus ? (
                    <IconThumbUp
                      style={{width: rem(12), height: rem(12)}}
                      color={theme.colors.teal[6]}
                      stroke={3}
                    />
                  ) : (
                    <IconThumbDown
                      style={{width: rem(12), height: rem(12)}}
                      color={theme.colors.red[6]}
                      stroke={3}
                    />
                  )
                }
              />
            </Grid.Col>
          </>
        }
      </Grid>
    </Card>
  )
})

export default DraggableCard
