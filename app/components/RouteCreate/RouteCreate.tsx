import { ActionDispatch } from 'react';

import { State, Action } from '@/app/utils/reducer';
import Modal from '../Modal/Modal';

import './RouteCreate.css'

export default function RouteCreate({ state, dispatch }: { state: State, dispatch: ActionDispatch<[action: Action]> }) {
  return (
    <Modal stateSwitch={state.isRouteModalShown} dispatch={dispatch} action={{ type: 'SET_MODAL_ROUTE', payload: false }}>
      <div>route</div>
    </Modal>
  )
}