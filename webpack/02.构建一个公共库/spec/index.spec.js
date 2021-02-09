import AnimalApi from '../index'

describe('animal-api', () => {

  it('gets dogs', () => {

    return AnimalApi.getDog()

      .then((animal) => {

        expect(animal.imageSrc).not.toBeUndefined()

        expect(animal.text).toEqual('DOG')
        

      })
  })

})
