import React from 'react'
import { MdDone } from 'react-icons/md'
import PriorityFlag from './PriorityFlag'
import { IPriority } from '../Task/types'
import useOutsideClick from '@/utils/useOutsideClick'

interface PriorityOption {
  name: string
  priority: IPriority
}

const priorityOptions: PriorityOption[] = [
  { name: 'Priority 1', priority: 'p1' },
  { name: 'Priority 2', priority: 'p2' },
  { name: 'Priority 3', priority: 'p3' },
  { name: 'Priority 4', priority: 'p4' },
]

interface Props {
  selected: IPriority
  setSelected: (arg: IPriority) => void
}
function PrioritySelect({ selected, setSelected }: Props) {
  const [open, setOpen] = React.useState(false)
  const handleOutsideClick = () => {
    setOpen(false)
  }
  const ref = useOutsideClick<HTMLDivElement>(handleOutsideClick)

  return (
    <div className="relative" ref={ref}>
      <PriorityFlag
        priority={selected}
        className="h-7 w-7 rounded-md p-1 transition-colors hover:bg-gray-200"
        onClick={() => setOpen(!open)}
      />
      <div
        className={`${
          open ? 'block' : 'hidden'
        } absolute right-0 bottom-[40px] min-w-[250px] rounded-lg border-[1px] border-gray-300 bg-gray-50`}
      >
        <ul className="flex flex-col">
          {priorityOptions.map(({ name, priority }, index) => (
            <Priority
              name={name}
              key={index}
              selected={priority === selected}
              onClick={() => setSelected(priority)}
              priority={priority}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

function Priority({
  name,
  selected,
  onClick,
  priority,
}: {
  name: string
  selected: boolean
  onClick(): void
  priority: IPriority
}) {
  return (
    <li
      className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-gray-200"
      onClick={onClick}
    >
      <PriorityFlag className="h-5 w-5" priority={priority} />
      <span className="font-light">{name}</span>
      {selected && <MdDone className="ml-auto text-red-700" />}
    </li>
  )
}

export default PrioritySelect
