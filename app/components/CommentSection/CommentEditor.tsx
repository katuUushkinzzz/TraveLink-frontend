import { ActionDispatch, useState } from "react";
import Image from 'next/image'

import { State, Action } from "@/utils/reducer";
import Modal from "../Modal";

import './CommentEditor.css'

export default function CommentEditor({ state, dispatch }: { state: State, dispatch: ActionDispatch<[action: Action]> }) {
  const [volatileRate, setVolatileRate] = useState(0);
  const [constantRate, setConstantRate] = useState(0);

  return (
    <Modal stateSwitch={state.isCommentEditorVisible} dispatch={dispatch} action={{ type: 'SET_COMMENT_EDITOR', payload: false }}>
      <div className="editorContainer">
        <h1 className="txt editorTitle">Как вам это место?</h1>
        <div className="editorHeader">
          <Image src={state.pointData?.image ?? '/search-window/route-previews/checker.png'} alt='' width={270} height={152} />
          <div className="editorInfo" >
            <h1 className="txt">{state.pointData?.pointName}</h1>
            <div className='starsRow'>
              <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Image key={`bg-${i}`} src="/search-window/star.svg" alt="" width={25} height={23.75} style={{
                    filter: 'grayscale(100%)', opacity: 0.4
                  }} />
                ))}
              </div>
              <div style={{ display: 'flex', position: 'relative' }}>
                {[1, 2, 3, 4, 5].map(i => {
                  return <Image key={`fill-${i}`} alt="" src='/search-window/star.svg' width={25} height={23.75} style={{
                    clipPath: `inset(0 ${volatileRate - i > 0 ? '0' : (i - volatileRate) * 100}% 0 0)`
                  }} />
                })}
              </div>
              <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0 }}>
                {[0, 1, 2, 3, 4].map((i) =>
                  <div key={i} style={{ display: 'flex', width: 25, height: 23.75 }}
                    onClick={() => setConstantRate(volatileRate)}
                    onMouseLeave={() => setVolatileRate(constantRate)}
                  >
                    <div style={{ width: 17.5 }} onMouseEnter={() => setVolatileRate(i + 0.5)} />
                    <div style={{ width: 17.5 }} onMouseEnter={() => setVolatileRate(i + 1.0)} />
                  </div>)}
              </div>
            </div>
          </div>
        </div>
        <textarea className="txt editorText" rows={2} placeholder="Комментарий..."></textarea>
        <div className="editorPhotoContainer"></div>
        <button className="txt editorSend">Отправить</button>
      </div>
    </Modal>
  )
}