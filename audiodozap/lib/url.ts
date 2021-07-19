import kebabCase from 'lodash/kebabCase'

export const audioUrl = (slug: string) => {
  return `/audio/${slug}/`
}

export const categoryUrl = (category: string) => {
  return `/categorias/${kebabCase(category)}/`
}

export const categoriesUrl = () => {
  return '/categorias/'
}

export const audioPageUrl = (page: string | number) => {
  return `/pagina/${page}/`
}
