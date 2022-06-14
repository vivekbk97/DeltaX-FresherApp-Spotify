import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import ProfileModal from '../components/AddArtistModal'

const CreateSong = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [artWork, setArtWork] = useState('')
  const [artists, setArtists] = useState([])
  const [selected, setSelected] = useState([])
  const [modal, setModal] = useState(false)

  const [options, setOptions] = useState([])

  const getArtists = async () => {
    await fetch('/artist/displayAllArtists', {
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
    getArtists()
  }, [])

  useEffect(() => {
    setOptions(
      artists.map(artist => {
        return {
          label: artist.name,
          value: artist._id
        }
      })
    )
    console.log('hi')
  }, [artists])

  const postSong = async () => {
    const body = {
      name: name,
      dateOfRelease: date,
      coverImage: artWork,
      artists: selected.map(selectedArtists => selectedArtists.value)
    }

    console.log(body)

    await fetch('/song/create', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  const saveHandler = () => {
    postSong()
    setName('')
    setDate('')
    setArtWork('')
    setSelected('')
  }

  return (
    <div>
      Adding a new song
      <div>
        <span>Song Name</span>
        <input
          type='text'
          onChange={e => {
            setName(e.target.value)
          }}
        />
      </div>
      <div>
        <span>Date Released</span>
        <input
          type='text'
          onChange={e => {
            setDate(e.target.value)
          }}
        />
      </div>
      <div>
        <span>Art Work</span>
        <input
          type='file'
          onChange={e => {
            setArtWork(e.target.value)
          }}
        />
      </div>
      <div>
        <span>Artists</span>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy='Select'
        />
        <button
          onClick={() => {
            setModal(true)
          }}
        >
          Add Artist
        </button>
      </div>
      <div>
        <button>Cancel</button>
        <button onClick={() => saveHandler()}>Save</button>
      </div>
      <ProfileModal modal={modal} setModal={setModal} setArtists={setArtists} />
    </div>
  )
}

export default CreateSong
