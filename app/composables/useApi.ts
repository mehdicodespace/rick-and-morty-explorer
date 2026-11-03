export function useApi(baseURL?: string) {
  const config = useRuntimeConfig()
  return $fetch.create({
    baseURL: baseURL || config.public.apiBase,
    timeout: 15_000,
    retry: 1,
  })
}
