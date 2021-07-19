import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import slugify from 'slugify'
import { titleVariants } from '../components/audio/Title'
import { colorSelection } from './colorSelection'

export function getPosts() {
  const postsDirectory = join(process.cwd(), '..', 'blog')

  const directories = fs.readdirSync(postsDirectory)

  const result = directories.flatMap((directory) => {
    const dateDirectory = join(postsDirectory, directory)

    const postsInDate = fs.readdirSync(dateDirectory).map((post) => ({
      date: directory,
      slug: post.replace(/\.mdx$/, ''),
      path: join(dateDirectory, post),
    }))

    return postsInDate
  })

  return result
}

export type Post = {
  date: string
  slug: string
  title: string
  audio: string
  categories: string[]
  content: string
  excerpt: string
  colorNumber: number
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getPosts()
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    return null
  }

  const fileContents = fs.readFileSync(post!.path, 'utf8')

  const { data, content } = matter(fileContents)

  return {
    date: post!.date,
    slug: post!.slug,
    title: data.title,
    audio: data.audio,
    categories: data.categories,
    content,
    colorNumber: colorSelection(data.title, titleVariants),
    excerpt: content.length > 200 ? content.slice(0, 200) + '…' : content,
  }
}

export function getAllPosts() {
  const posts = getPosts()
    .map((post) => getPostBySlug(post.slug))
    .filter(Boolean) as Post[]

  // sort posts by date in descending order
  posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return posts
}

export type PageInfo = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  from: number
  to: number
}

export type Page = {
  total: number
  edges: Post[]
  pageInfo: PageInfo
}

export function paginatePosts(): Page[] {
  const perPage = 10
  const posts = getAllPosts()

  let pages = []
  let i = 0
  let currentPage = 1
  while (i < posts.length) {
    const from = i
    const to = i + perPage

    pages.push({
      total: posts.length,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        page: currentPage,
        from,
        to,
      },
      edges: posts.slice(from, to),
    })

    currentPage += 1
    i += perPage
  }

  pages = pages.map((page, index) => {
    page.pageInfo.hasNextPage = index !== pages.length - 1
    page.pageInfo.hasPreviousPage = index !== 0

    return page
  })

  return pages
}

export type Category = {
  name: string
  slug: string
  quantity: number
  posts: Post[]
}

export function getCategories() {
  const posts = getAllPosts()

  const categories = posts.reduce<Record<string, Category>>((acc, post) => {
    for (const category of post.categories) {
      const categorySlug = slugify(category, { lower: true })

      if (acc[categorySlug]) {
        acc[categorySlug].quantity += 1
        acc[categorySlug].posts.push(post)
      } else {
        acc[categorySlug] = {
          name: category,
          slug: categorySlug,
          quantity: 1,
          posts: [post],
        }
      }
    }

    return acc
  }, {})

  return categories
}
