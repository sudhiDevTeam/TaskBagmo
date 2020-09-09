import Axios from 'axios'
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBTable,
  MDBTableBody,
  MDBTableFoot,
  MDBTableHead,
} from 'mdbreact'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2'
import EditCricket from './EditCricket'
import './ListTable.css'

function ListTable({ triggered }) {
  const [datatable, setDatatable] = useState([])
  const [last, setLast] = useState('')
  const [pages, setpages] = useState('')
  const [searchByname, setSearchByname] = useState('')
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [highScore, setHighScore] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [_id, setId] = useState('')
  useEffect(() => {
    getData()
  }, [triggered])
  useEffect(() => {
    if (searchByname !== '') {
      Axios.get(
        `http://localhost:8080/api/get-cricketer-searchByletter/${searchByname}`,
      )
        .then((response) => response.data)
        .then((data) => {
          setDatatable(data)

          setpages(data.length)
        })
    } else {
      getData()
    }
  }, [searchByname])
  const getData = () => {
    Axios.get(`http://localhost:8080/api/pagable/0/10`)
      .then((response) => response.data)
      .then((data) => {
        setDatatable(data.content)
        setLast(data.totalElements)
        setpages(data.totalPages)
      })
  }
  const getPage = (pageno, pagesize) => {
    Axios.get(`http://localhost:8080/api/pagable/${pageno}/${pagesize}`)
      .then((response) => response.data)
      .then((data) => {
        setDatatable(data.content)
        setLast(data.totalElements)
        setpages(data.totalPages)
      })
      .catch(() => {
        Swal.fire({
          icon: 'info',
          title: 'Oops',
          text: 'No Data found',
        })
      })
  }

  const editData = (event, id, name, country, highSCore) => {
    event.preventDefault()
    setId(id)
    setName(name)
    setCountry(country)
    setHighScore(highSCore)
    setShowModal(true)
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected

    getPage(selectedPage, 10)
  }
  const removeData = (event, id) => {
    event.preventDefault()
    Axios({
      method: 'DELETE',
      url: `http://localhost:8080/api/removeData/${id}`,
    })
      .then((responese) => {
        Swal.fire({
          icon: 'success',
          title: 'Removed',
          text: `${responese}`,
        }).then(() => {
          getData()
        })
      })
      .catch((erroe) => {
        Swal.fire('Oops', erroe, 'warning')
      })
  }

  return (
    <MDBContainer className="listTable">
      <div className="listtable__search">
        <MDBInput
          label="Search "
          icon="search"
          value={searchByname}
          onChange={(event) => setSearchByname(event.currentTarget.value)}
        />
      </div>
      <MDBTable>
        <MDBTableHead color="primary-color" textWhite>
          <tr>
            <th>#</th>
            <th>
              Name <MDBIcon icon="home" />
            </th>
            <th>Country</th>
            <th>HighScore</th>
            <th></th>
            <th></th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {datatable.map((data) => {
            if (data !== null) {
              return (
                <tr>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.country}</td>
                  <td>{data.highestScore}</td>
                  <td>
                    <MDBBtn
                      onClick={(event) =>
                        editData(
                          event,
                          data.id,
                          data.name,
                          data.country,
                          data.highestScore,
                        )
                      }
                    >
                      Edit
                      <MDBIcon icon="pencil-alt" />
                    </MDBBtn>
                  </td>
                  <td>
                    <MDBBtn onClick={(event) => removeData(event, data.id)}>
                      Delete
                      <MDBIcon far icon="trash-alt" />
                    </MDBBtn>
                  </td>
                </tr>
              )
            }
          })}
        </MDBTableBody>
        <MDBTableFoot>
          <div className="pagination">
            <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
        </MDBTableFoot>
      </MDBTable>
      {showModal ? (
        <EditCricket
          showModal={showModal}
          id={_id}
          name={name}
          country={country}
          highSCore={highScore}
          setModal={setShowModal}
          tigger={getData}
        />
      ) : (
        <></>
      )}
    </MDBContainer>
  )
}

export default ListTable
