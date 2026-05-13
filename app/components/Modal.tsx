import Image from 'next/image'

import { Action } from '../types/LocalTypes'
import './Modal.css'
import { ReactNode } from 'react'

export default function Modal({ stateSwitch, dispatch, action, children }:
  {
    stateSwitch: boolean, dispatch: (action: Action) => void, action: Action, children: ReactNode
  }) {
  return (
    <>
      {stateSwitch && <div className='modalBackground'>
        <div className='modalContainer'>
          <button className='modalClose' onClick={() => dispatch(action)}>
            <Image alt="" src="/search-window/close-button.svg" width={20} height={20} className='img' />
          </button>
          {children}
        </div>
      </div>}
    </>
  )
} 