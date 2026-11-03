export interface ApiCharacterPage {
  info: { count: number; pages: number; next: string | null; prev: string | null }
  results: Character[]
}

export interface ResourceReference {
  name: string
  url: string
}

export interface CharacterPage {
  info: { count: number; pages: number }
  results: Character[]
}

export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: ResourceReference
  location: ResourceReference
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface CharacterLocation {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export interface CharacterDetails {
  character: Character
  episodes: Episode[]
  locations: CharacterLocation[]
}
