import Axios from 'axios'
import {
  MDBBtn,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from 'mdbreact'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

function EditCricket({
  showModal,
  setModal,
  id,
  name,
  country,
  highSCore,
  tigger,
}) {
  const [state, setState] = useState(showModal)
  const [_name, setName] = useState(name)
  const [_country, setCountry] = useState(country)
  const [_highScore, setHighScore] = useState(highSCore)

  const [_id, setId] = useState(id)
  const toggle = (e) => {
    e.preventDefault()
    setState(!state)
    setModal(false)
  }
  const updateData = (event) => {
    event.preventDefault()
    var data = JSON.stringify({
      name: _name,
      country: _country,
      highestScore: _highScore,
    })

    Axios({
      method: 'PUT',
      url: `http://localhost:8080/api/update-cricketer/${_id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: ' 👍',
          text: 'Data updated Success fully',
        }).then(() => {
          tigger()
          setId('')
          setName('')
          setCountry('')
          setHighScore('')
          setModal(false)
        })
      })
      .catch((error) => {
        Swal.fire('someting went wrong', error, 'warning')
      })
  }
  return (
    <MDBContainer>
      <MDBBtn color="primary" onClick={toggle}>
        MDBModal
      </MDBBtn>
      <MDBModal isOpen={state} toggle={toggle} centered>
        <MDBModalHeader toggle={toggle}>MDBModal title</MDBModalHeader>
        <form>
          <MDBModalBody>
            <p className="h4 text-center mb-4">Add Data</p>
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
              Name
            </label>
            <input
              value={_name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              id="defaultFormRegisterNameEx"
              className="form-control"
            />
            <br />
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
              Country
            </label>
            <input
              value={_country}
              onChange={(event) => setCountry(event.target.value)}
              type="text"
              id="defaultFormRegisterNameEx"
              className="form-control"
            />
            <br />
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
              High Score
            </label>
            <input
              value={_highScore}
              onChange={(event) => setHighScore(event.target.value)}
              type="text"
              id="defaultFormRegisterNameEx"
              className="form-control"
            />
            <br />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggle}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" type="submit" onClick={updateData}>
              Save changes
            </MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    </MDBContainer>
  )
}

export default EditCricket
