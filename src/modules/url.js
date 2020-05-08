import kebabCase from 'lodash/kebabCase'

export const audioUrl = (slug) => {
  return `/audio${slug}/`
}

export const categoryUrl = (category) => {
  return `/categorias/${kebabCase(category)}/`
}

export const categoriesUrl = () => {
  return '/categorias/'
}

export const audioPageUrl = (page) => {
  return `/pagina/${page}`
}
