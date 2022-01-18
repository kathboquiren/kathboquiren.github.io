import { useState, useEffect } from 'react'

function App() {
  const url = 'https://randomuser.me/api/'
  const defaultImage = 'https://randomuser.me/api/portraits/women/9.jpg'

  const [isLoading, setIsLoading] = useState(true)
  const [randomPerson, setRandomPerson] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const refreshRandom = async () => {
    setIsLoading(true)
    const response = await fetch(url)
    const data = await response.json()
   
    const person = data.results[0]
    // destructure values
    const {
      email,
      name: { first, last },
      picture: { large: image }
    } = person
   
    const newPerson = {
      name: `${first} ${last}`,
      image,
      email
    }

    setRandomPerson(newPerson)
    setIsLoading(false)
    setName(newPerson.name)
    setEmail(newPerson.email)
  }

  useEffect(() => {
    refreshRandom()
  }, [])

  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={(randomPerson && randomPerson.image) || defaultImage}
            alt='random user'
            className='user-img'
          />
          <div className='user-value'>
              <span className='userlabel'>Name: </span>
              <span className='userValue'>{name}</span>
              </div>
          <div className='user-value'>
              <span className='userlabel'>Email: </span>
              <span className='userValue'>{email}</span>
          </div>
          <button className='btn' type='button' onClick={refreshRandom}>
            {isLoading ? 'loading...' : 'Refresh'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
