import React from 'react'
import { useForm } from '@inertiajs/inertia-react'
import useFocus from '@/utils/useFocus'

interface Props {
  close: () => void
}
const NewTaskForm = React.forwardRef<HTMLFormElement, Props>((props, ref) => {
  const { data, setData, post, wasSuccessful } = useForm({
    name: '',
    description: '',
  })
  const disableSubmit = data.name === ''
  const inputRef = useFocus()

  React.useEffect(() => {
    if (wasSuccessful) {
      props.close()
    }
  }, [wasSuccessful, props])
  return (
    <div>
      <form
        className="my-3 rounded-lg border-[1px] border-gray-400 p-5"
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault()
          post('/tasks')
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
      </form>
      <div className="flex justify-end gap-5">
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
            post('/tasks')
          }}
          disabled={disableSubmit}
        >
          Add task
        </button>
      </div>
    </div>
  )
})

NewTaskForm.displayName = 'NewTaskForm'
export default NewTaskForm
