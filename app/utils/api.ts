const api = `https://hacker-news.firebaseio.com/v0`
const json = '.json?print=pretty'

export interface post {
  dead: boolean;
  deleted: boolean;
  type: string;
  id: number;
  url: string;
  title: string;
  by: string;
  time: number;
  descendants: number;
  kids: string[];
  text: string;
}

function removeDead (posts: post[]): post[] {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true)
}

function removeDeleted (posts: post[]): post[] {
  return posts.filter(({ deleted }) => deleted !== true)
}

function onlyComments (posts: post[]): post[] {
  return posts.filter(({ type }) => type === 'comment')
}

function onlyPosts (posts: post[]): post[] {
  return posts.filter(({ type }) => type === 'story')
}

export function fetchItem (id: string): Promise<post> {
  return fetch(`${api}/item/${id}${json}`)
    .then((res) => res.json())
}

export function fetchComments (ids: string[]): Promise<post[]> {
  return Promise.all(ids.map(fetchItem))
    .then((comments) => removeDeleted(onlyComments(removeDead(comments))))
}

export function fetchMainPosts (type: string): Promise<post[]> {
  return fetch(`${api}/${type}stories${json}`)
    .then((res) => res.json())
    .then((ids) => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${type} posts.`)
      }

      return ids.slice(0, 50) as string[]
    })
    .then((ids) => Promise.all(ids.map(fetchItem)))
    .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
}

export function fetchUser (id: string) {
  return fetch(`${api}/user/${id}${json}`)
    .then((res) => res.json())
}

export function fetchPosts (ids: string[]): Promise<post[]> {
  return Promise.all(ids.map(fetchItem))
    .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
}