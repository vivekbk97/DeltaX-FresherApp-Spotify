import React, { useEffect, useRef, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { ToastContainer, toast } from 'react-toastify'
import ProfileModal from '../components/AddArtistModal'
import uploadpic from '../components/uploadpic'

const CreateSong = () => {
  const inputRef = useRef(null)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [artWork, setArtWork] = useState('')
  const [language, setLanguage] = useState('')
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
      artists: selected.map(selectedArtists => selectedArtists.value),
      language: language
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
    setName('')
    setDate('')
    setArtWork('')
    setSelected([])
    console.log(name, date, artWork, selected)
  }

  const saveHandler = () => {
    postSong()
  }

  const cancelHandler = () => {
    setName('')
    setDate('')
    inputRef.current.value = null
    setSelected([])
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: 'grey',
          color: 'white',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '50px',
          height: '50px'
        }}
      >
        Adding a new song
      </div>
      <div>
        <b>Song Name:- </b>
        <input
          type='text'
          onChange={e => {
            setName(e.target.value)
          }}
          value={name}
        />
      </div>
      <div>
        <b>Date Released:- </b>
        <input
          type='date'
          onChange={e => {
            setDate(e.target.value)
          }}
          value={date}
        />
      </div>
      <div>
        <b>Art Work:- </b>
        <input
          type='file'
          ref={inputRef}
          onChange={event => {
            event.preventDefault()
            uploadpic(event.target.files[0], toast, setArtWork)
          }}
        />
      </div>
      <div>
        <b>Song Language:- </b>
        <input
          type='text'
          onChange={e => {
            setLanguage(e.target.value)
          }}
          value={language}
        />
      </div>

      <div>
        <b>Artists</b>
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
          style={{ backgroundColor: 'orange' }}
        >
          Add Artist
        </button>
      </div>
      <div>
        <button
          style={{ backgroundColor: 'red' }}
          onClick={() => cancelHandler()}
        >
          Cancel
        </button>
        <button onClick={() => saveHandler()}>Save</button>
      </div>
      <ProfileModal modal={modal} setModal={setModal} setArtists={setArtists} />
      <ToastContainer />
    </div>
  )
}

export default CreateSong
