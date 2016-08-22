import expect from 'expect'
import {authorsFormattedForDropdown} from './selectors'

// For expensive calculations consider 'reselect' to avoid re-running it all the time.

describe('Author Selectors', () => {
  describe('authorsFormattedDropdown', () => {
    it('Should return author data formatted for use in a dropdown', () => {
      const authors = [
        {id: 'cory-house', firstName: 'Cory', lastName: 'House'},
        {id: 'scott-allen', firstName: 'Scott', lastName: 'Allen'}
      ]

      const expected = [
        {value: 'cory-house', text: 'Cory House'},
        {value: 'scott-allen', text: 'Scott Allen'}
      ]

      expect(authorsFormattedForDropdown(authors)).toEqual(expected)
    })
  })
})
