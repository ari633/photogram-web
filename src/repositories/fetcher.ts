const BASE_URL = 'https://test-project-396512.et.r.appspot.com/api';
const HEADERS = {
  "Content-Type": "application/json",
}

export async function getDataFeeds() {
  const res = await fetch(`${BASE_URL}/photo`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json();
}

export async function getDataComments(photoId: number) {
  const res = await fetch(`${BASE_URL}/comment/${photoId}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json();
}

export function postNewFeed(body: any) {
  return fetch(`${BASE_URL}/photo`, {
    method: "POST",
    headers: HEADERS,
    body: body,
  })
}

export function postNewComment(body: any) {
  return fetch(`${BASE_URL}/comment`, {
    method: "POST",
    headers: HEADERS,
    body: body,
  })
}