import React, { useEffect, useState } from 'react'
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'

const ProfileModal = ({ setArtist, modal, setModal }) => {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [bio, setBio] = useState('')

  const addArtist = async () => {
    const body = {
      name: name,
      dob: dob,
      bio: bio
    }

    await fetch('/artist/create', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  const clickHandler = () => {
    addArtist()
    setModal(false)
  }

  return (
    <PureModal
      header='Profile'
      isOpen={modal}
      closeButton='x'
      closeButtonPosition='header'
      onClose={() => {
        setModal(false)
        return true
      }}
      className='profileModal'
    >
      <div>
        <span>Artist Name</span>
        <input
          type='text'
          onChange={e => {
            setName(e.target.value)
          }}
        />
      </div>
      <div>
        <span>Date Of Birth</span>
        <input
          type='date'
          onChange={e => {
            console.log(e.target)
            setDob(e.target.value)
          }}
        />
      </div>
      <div>
        <span>Bio</span>
        <input
          type='text'
          onChange={e => {
            setBio(e.target.value)
          }}
        />
      </div>
      <div>
        <button onClick={() => clickHandler()}>Done</button>
      </div>
    </PureModal>
  )
}

export default ProfileModal
