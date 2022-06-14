import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Header from '../components/Header'

const HomePage = () => {
  const navigate = useNavigate()
  const [songs, setSongs] = useState([])
  const [artists, setArtists] = useState([])

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

  useEffect(() => {
    getTopSongs()
    getTopArtists()
  }, [])

  const clickHandler = () => {
    navigate('/createSong')
  }

  const updateRating = async (event, songId) => {
    const body = {
      songId: songId,
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
      <Header />
      <button className='addButton' onClick={() => clickHandler()}>
        Add New Song +
      </button>
      Top 10 Songs
      <li className='topSongs'>
        {songs.map((data, index) => {
          return (
            <div key={index} className='song'>
              <img className='songImage' src={data.coverImage} />
              <h1>{data.name}</h1>
              <h3>{data.dateOfRelease}</h3>
              <h4>{JSON.stringify(data.artists)}</h4>
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
      Top 10 Songs
      <li className='topArtists'>
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
