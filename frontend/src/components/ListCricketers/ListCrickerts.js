import Axios from 'axios'
import { MDBContainer, MDBDataTableV5 } from 'mdbreact'
import React, { useEffect, useState } from 'react'

function ListCrickerts({ triggered }) {
  const [datatable, setDatatable] = useState([])
  const colms = [
    {
      label: 'ID',
      field: 'id',
      width: 270,
    },
    {
      label: 'Name',
      field: 'name',
      width: 150,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Name',
      },
    },

    {
      label: 'Country',
      field: 'country',
      width: 200,
    },
    {
      label: 'High Score',
      field: 'highestScore',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'High Score',
      field: '',
      sort: 'asc',
      width: 100,
    },
  ]
  const testing = {
    columns: colms,
    rows: datatable,
  }
  useEffect(() => {
    Axios.get('http://localhost:8080/api/getAll-cricketer').then((response) => {
      setDatatable(response.data)
    })
  }, [triggered])

  return (
    <MDBContainer className="listcricket">
      <MDBDataTableV5
        hover
        entriesOptions={[5, 10, 15]}
        entries={10}
        pagesAmount={4}
        data={testing}
        proSelect={true}
        tag="div"
      />
    </MDBContainer>
  )
}

export default ListCrickerts
