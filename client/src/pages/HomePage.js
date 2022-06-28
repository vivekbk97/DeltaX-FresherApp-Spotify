import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const HomePage = () => {
  const navigate = useNavigate()
  const [songs, setSongs] = useState([])
  const [artists, setArtists] = useState([])
  const [userId, setuserId] = useState('')

  const getTopSongs = async () => {
    await fetch('/song/displayTopSongs', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setSongs(data)
      })
  }

  const getTopArtists = async () => {
    await fetch('/artist/displayTopArtists', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setArtists(data)
      })
  }

  const getUser = () => {
    console.log(localStorage.getItem('user'))
    const user = JSON.parse(localStorage.getItem('user'))
    setuserId(user._id)
  }

  useEffect(() => {
    getTopSongs()
    getTopArtists()
    getUser()
  }, [])

  const clickHandler = () => {
    navigate('/createSong')
  }

  const updateRating = async (event, songId) => {
    const body = {
      songId: songId,
      userId: userId,
      ratingGiven: Number(event.target.value)
    }
    await fetch('/user/updateSongRating', {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res)
      .then(data => console.log(data))
  }

  return (
    <div>
      <button className='addButton' onClick={() => clickHandler()}>
        Add New Song +
      </button>
      <br />
      <br />
      <h1 style={{ textAlign: 'center' }}>Top 10 Songs</h1>
      <li className='topSongs'>
        <div className='song' style={{ backgroundColor: 'grey' }}>
          <h2>Cover</h2>
          <h2>Name</h2>
          <h2>Date Of Release</h2>
          <h2>Artists</h2>
          <h2>Language</h2>
          <h2>Average Rating</h2>
          <h2>Rate Song</h2>
        </div>
        {songs.map((data, index) => {
          return (
            <div key={index} className='song'>
              <img src={data.coverImage} style={{ width: '10%' }} />
              <h1 style={{ display: 'flex', alignItems: 'center' }}>
                {data.name}
              </h1>
              <h3 style={{ display: 'flex', alignItems: 'center' }}>
                {data.dateOfRelease}
              </h3>
              <h4 style={{ display: 'flex', alignItems: 'center' }}>
                {data.artists
                  .map(artist => artist.name.toUpperCase())
                  .join(',\t')}
              </h4>
              <h4 style={{ display: 'flex', alignItems: 'center' }}>
                {data.language}
              </h4>

              <h4 style={{ display: 'flex', alignItems: 'center' }}>
                {data.averageRating}
              </h4>
              <select onChange={e => updateRating(e, data._id)}>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
          )
        })}
      </li>
      <br />
      <br />
      <h1 style={{ textAlign: 'center' }}>Top 10 Artists</h1>
      <li className='topArtists'>
        <div className='artist' style={{ backgroundColor: 'grey' }}>
          <h2>Name</h2>
          <h2>DOB</h2>
          <h2>Bio</h2>
        </div>

        {artists.map((data, index) => {
          return (
            <div key={index} className='artist'>
              <h1>{data.name}</h1>
              <h3>{data.dob}</h3>
              <h4>{data.bio}</h4>
            </div>
          )
        })}
      </li>
    </div>
  )
}

export default HomePage
