import {CardStatus} from '../enums'
import {makeObservable, observable} from 'mobx'
import {v4 as uuidv4} from 'uuid'

class CardModel {
  id: string = uuidv4()
  email: string = ''
  comment: string = ''
  status: CardStatus = CardStatus.TO_CONTACT
  doneStatus: boolean = false


  constructor() {
    makeObservable(this, {
      email: observable,
      comment: observable,
      status: observable
    })
  }
}

export default CardModel
