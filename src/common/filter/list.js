import {timeAgo} from './index'

export default function RecordList (dataList) {
  const len = dataList.length
  let i
  const arr = []
  for (i = 0; i < len; i++) {
    const item = dataList[i]
    item.created_at = timeAgo(item.created_at)
    arr.push(item)
  }
  return arr
}
