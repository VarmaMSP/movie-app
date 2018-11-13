// @flow
import type { State } from 'types/store'
import type { User, Profile } from 'types/profile'

export function getLoggedInUser (state: State): ?User {
  return state.entities.profile.loggedInUser
}

export function getProfile (state: State, profileId: ?number): ?Profile {
  const { loggedInUser } = state.entities.profile
  const userId = loggedInUser && !profileId
    ? loggedInUser.id
    : profileId
  return userId
    ? state.entities.profile.byId[userId]
    : undefined
}

export function getProfileResults (state: State, searchQuery: string): Array<Profile> {
  const results = state.entities.profile.searchResults[searchQuery]
  return results
    ? results.map(r => state.entities.profile.byId[r])
    : []
}
