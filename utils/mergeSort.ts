const mergeSort = <T extends Record<string, any>>(
  items: T[],
  itemKey: string,
  ascending: boolean = true
): T[] => {
  if (items.length <= 1) {
    return items
  }

  const middle = Math.floor(items.length / 2)
  const left = items.slice(0, middle)
  const right = items.slice(middle)

  return merge(
    mergeSort(left, itemKey, ascending),
    mergeSort(right, itemKey, ascending),
    itemKey,
    ascending
  )
}

const merge = <T extends Record<string, any>>(
  left: T[],
  right: T[],
  itemKey: string,
  ascending: boolean
): T[] => {
  const sortedArray: T[] = []

  while (left.length && right.length) {
    if (ascending) {
      if (left[0][itemKey] <= right[0][itemKey]) {
        sortedArray.push(left.shift()!)
      } else {
        sortedArray.push(right.shift()!)
      }
    } else {
      if (left[0][itemKey] >= right[0][itemKey]) {
        sortedArray.push(left.shift()!)
      } else {
        sortedArray.push(right.shift()!)
      }
    }
  }

  return sortedArray.concat(left, right)
}

export default mergeSort
