import React from 'react'
import { useForm } from '@inertiajs/inertia-react'
import useFocus from '@/utils/useFocus'
import Datepicker from '../Datepicker'
import PrioritySelect from './PrioritySelect'

type IPriority = 'p1' | 'p2' | 'p3' | 'p4'

interface Props {
  close: () => void
}
interface FormDataType {
  name: string
  description: string
  due_date: number | undefined
  priority: IPriority
}
function NewTaskForm(props: Props) {
  const initalData: FormDataType = {
    name: '',
    description: '',
    due_date: undefined,
    priority: 'p4',
  }
  const { data, setData, post } = useForm(initalData)
  const disableSubmit = data.name === ''
  const inputRef = useFocus()

  const createTask = () => {
    post('/tasks', {
      onSuccess: () => {
        props.close()
      },
    })
  }
  const formRef = React.useRef<HTMLFormElement>(null)
  React.useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key !== 'Enter') return
      if (disableSubmit) return
      formRef.current?.requestSubmit()
    }

    document.addEventListener('keypress', handleKeyPress)
    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [disableSubmit])

  return (
    <div>
      <form
        className="my-3 rounded-lg border-[1px] border-gray-400 p-5"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault()
          createTask()
        }}
      >
        <input
          type="text"
          placeholder="Task name"
          className="w-full bg-inherit text-lg text-black focus:outline-none"
          onChange={(e) => setData('name', e.target.value)}
          ref={inputRef}
        />

        <input
          type="text"
          placeholder="Description"
          className="mt-1 mb-4 w-full bg-inherit text-lg text-black focus:outline-none"
          onChange={(e) => setData('description', e.target.value)}
        />
        <div className="flex items-center justify-between">
          <Datepicker setDate={(date: number) => setData('due_date', date)} />
          <div className="flex gap-3">
            <PrioritySelect
              selected={data.priority}
              setSelected={(priority: IPriority) =>
                setData('priority', priority)
              }
            />
          </div>
        </div>
      </form>
      <form className="flex justify-end gap-5">
        <button
          className="rounded-md bg-gray-300 px-3 py-3 text-xl text-gray-800"
          onClick={props.close}
        >
          Cancel
        </button>
        <button
          className={`rounded-md px-3 py-3 text-xl text-white ${
            disableSubmit ? 'bg-red-300' : 'bg-primary'
          }`}
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            createTask()
          }}
          disabled={disableSubmit}
        >
          Add task
        </button>
      </form>
    </div>
  )
}

export default NewTaskForm
