export const lazyViews = (name, index = false) => () =>
    import (`@/views/${name}${index ? '/index' : ''}.vue`)
export const lazyComponents = (name, index = false) => () =>
    import (`@/components/${name}${index ? '/index' : ''}.vue`)