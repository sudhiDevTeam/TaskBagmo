import axios from 'axios'
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import ListTable from '../ListCricketers/ListTable'
import './AddCricketers.css'
function AddCricketers() {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [highScore, setHighScore] = useState('')
  const [trigered, settrigered] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    var data = JSON.stringify({
      name: name,
      country: country,
      highestScore: highScore,
    })

    axios({
      method: 'POST',
      url: 'http://localhost:8080/api/add-cricketer',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'New Data Added',
        }).then(() => {
          settrigered(!trigered)
          setName('')
          setCountry('')
          setHighScore('')
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: 'info',
          title: 'Oops  😲',
          text: 'Some thing went wrong ',
        })
      })
  }

  return (
    <MDBContainer className="cricket">
      <div className="cricket__container">
        <MDBRow>
          <MDBCol md="6">
            <form>
              <p className="h4 text-center mb-4">Add Data</p>
              <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                Name
              </label>
              <input
                value={name}
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
                value={country}
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
                value={highScore}
                onChange={(event) => setHighScore(event.target.value)}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
              />
              <br />

              <div className="text-center mt-4">
                <MDBBtn color="unique" type="submit" onClick={handleSubmit}>
                  Add
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </div>
      {/* <ListCrickerts triggered={trigered} /> */}
      <ListTable triggered={trigered} />
    </MDBContainer>
  )
}

export default AddCricketers
