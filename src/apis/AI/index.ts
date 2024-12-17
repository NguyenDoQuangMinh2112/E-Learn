// https://damp-bastion-99051-92c994c25ba2.herokuapp.com/sync_suggest (xài đầu tiên)
// https://damp-bastion-99051-92c994c25ba2.herokuapp.com/get_suggest (next)

import authorizedAxiosInstance from '~/axios'

export const syncSuggest = async () => {
  return await authorizedAxiosInstance.get(`https://damp-bastion-99051-92c994c25ba2.herokuapp.com/sync_suggest`)
}

export const getSuggest = async (course_id: string) => {
  return await authorizedAxiosInstance.post(
    `https://damp-bastion-99051-92c994c25ba2.herokuapp.com/get_suggest`,
    course_id
  )
}
