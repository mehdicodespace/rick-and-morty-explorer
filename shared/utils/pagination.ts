export function parsePage(value: unknown): number {
  if (typeof value !== 'string') return 1
  if (!/^[1-9]\d*$/.test(value)) return 1
  return Number(value)
}

export function paginationItems(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    const pages: number[] = []
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }
  if (current <= 4) return [1, 2, 3, 4, 5, 'ellipsis']
  if (current >= total - 3) return ['ellipsis', total - 4, total - 3, total - 2, total - 1, total]
  return ['ellipsis', current - 1, current, current + 1, 'ellipsis']
}
