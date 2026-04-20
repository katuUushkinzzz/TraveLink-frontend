import { ActionDispatch } from 'react'
import { State, Action } from '../LocalTypes'

import './CommentSection.css'
import Modal from '../Modal'

export default function CommentSection({ state, dispatch }: { state: State, dispatch: ActionDispatch<[action: Action]> }) {
  return (
    <Modal stateSwitch={state.isCommentVisible} dispatch={dispatch} action={{ type: 'SET_COMMENT_SHOWN', payload: false }}>
      <div className='cityPickerHeader'>
        <div className='cityPickerHeaderHeader'>
          <h1 className='txt'>Отзывы</h1>
        </div>
        <h1 className='txt'>{state.pointData?.pointRating}</h1>
        <span className='txt'>на основании {state.pointData?.ratingCount} оценок</span>
      </div>
    </Modal>
  )
}