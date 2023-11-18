import {
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation'
import classNames from 'classnames'
import React from 'react'
import { ReactComponent as BackIcon } from '../assets/back.svg'
import { ReactComponent as SpaceIcon } from '../assets/space.svg'

const ALPHABETS = [...Array(26).keys()].map((n) => String.fromCharCode(97 + n))
const NUMBERS = [...Array(10).keys()].map((number) => `${number}`)

type KeyProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'onKeyPress'
> & {
  onKeyPress?: (key: string) => void
  keyCode: string
}

const Key = ({ keyCode, children, onKeyPress, ...props }: KeyProps) => {
  const { focused, ref } = useFocusable({
    focusKey: `${keyCode}`,
    onEnterPress: () => {
      ref.current.click()
    },
    onEnterRelease: () => {
      onKeyPress?.(keyCode)
    },
  })

  return (
    <div ref={ref} {...props}>
      <div
        className={classNames(
          'flex justify-center items-center w-full h-full bg-gray-800',
          { 'ring-2 ring-inset ring-gray-300': focused },
        )}>
        <p
          className={classNames(
            'text-3xl',
            focused ? 'text-gray-300' : 'text-gray-500',
          )}>
          {children}
        </p>
      </div>
    </div>
  )
}

type KeyboardProps = {
  onKeyPress?: (key: string) => void
  onBackSpace?: () => void
}

export const Keyboard = ({ onKeyPress, onBackSpace }: KeyboardProps) => {
  React.useEffect(() => {
    setFocus('a')
  }, [])

  return (
    <div className="flex flex-wrap">
      <div className="flex w-full">
        <Key
          keyCode={' '}
          onKeyPress={onKeyPress}
          className="flex flex-1 p-0.5 aspect-[7/2]">
          <SpaceIcon width={48} className="mt-1" />
        </Key>
        <Key
          keyCode={'Backspace'}
          onKeyPress={onBackSpace}
          className="flex flex-1 p-0.5">
          <BackIcon width={32} />
        </Key>
      </div>
      {[...ALPHABETS, ...NUMBERS].map((letter) => (
        <Key
          keyCode={letter}
          onKeyPress={onKeyPress}
          className="flex aspect-square p-0.5"
          style={{ width: 'calc(100% /6)' }}>
          {letter}
        </Key>
      ))}
    </div>
  )
}
