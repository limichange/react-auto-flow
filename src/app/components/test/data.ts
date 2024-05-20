type Component = {
  name: string
  withComponentHook: boolean
}

type Components = Component[]

const components: Components = [
  {
    name: 'Content',
    withComponentHook: false,
  },
  {
    name: 'ComponentWithComponentHook',
    withComponentHook: true,
  },
]

export const data = {
  components: [],
}
