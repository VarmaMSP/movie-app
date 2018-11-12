import { message } from 'antd'

let input = document.createElement('INPUT')
input.setAttribute('type', 'file')
input.setAttribute('accept', 'image/*')

export function openDialog () {
  input.click()
}

export function onImageSelect (fun: (string) => void) {
  input.addEventListener('change', () => {
    const file = input.files[0]
    if (file.size > 50 * 1024) {
      message.info('Image should be less than 100Kb.')
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => fun(reader.result))
  })
}
