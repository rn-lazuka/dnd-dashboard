import CardModel from './CardModel'
import {action, makeObservable, observable} from 'mobx'

class DashboardStore {
  cards: CardModel[] = []

  constructor() {
    makeObservable(this, {
      cards: observable,
      addCard: action,
      moveCard: action
    })
  }

  addCard() {
    const newCard = new CardModel()
    this.cards.push(newCard)
  }

  changeEmail(cardId: string, email: string) {
    const card = this.cards.find((card) => card.id === cardId)
    if (card) {
      card.email = email
    }
  }

  changeComment(cardId: string, comment: string) {
    const card = this.cards.find((card) => card.id === cardId)
    if (card) {
      card.comment = comment
    }
  }

  changeIsDoneStatus(cardId: string, isDone: boolean) {
    const card = this.cards.find((card) => card.id === cardId)
    if (card) {
      card.doneStatus = isDone
    }
  }

  deleteCard(cardId: string) {
    const cardIndex = this.cards.findIndex(card => card.id === cardId)
    this.cards.splice(cardIndex, 1)
  }

  moveCard(currentCardWithNewStatus: CardModel) {
    const cardIndex = this.cards.findIndex((card) => card.id === currentCardWithNewStatus.id)
    if (cardIndex !==-1) {
      this.cards.splice(cardIndex,1,currentCardWithNewStatus)
    }
  }
}

export const dashboardStore = new DashboardStore()
