const Table = ({
    columns,
    datas,
    onDelete,
    type
})=>{
    if(localStorage.getItem("token")){     
    const decode = JSON.parse(localStorage.getItem("decode"));

    const renderElement = ()=>{
        if(type === "consultation"){
            return datas?.map((data, index) => {
                        return(
                    <tr key={index}>

                        <td>{data.id}</td>
                        <td>{data.doctorId}</td>
                        <td>{data.patientId}</td>
                        <td>{data.consulDate}</td>
                        <td>{data.info}</td>
                        {decode.role === 3 || decode.role === 1?                 
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={()=>{window.confirm('delete this item?') && onDelete(data.id)}}>Delete</button> &nbsp;
                                <a className="btn btn-sm btn-success" href={`cars/edit/${data.id}`}>Edit</a>   
                            </td>:false
                        }
                    </tr>
                    )
                    })
        }else if (type === "doctor"){
            return datas?.map((data, index) => {
                return(
            <tr key={index}>

                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.birthDate}</td>
                <td>{data.birthPlace}</td>
                <td>{data.scheduleId}</td>
                <td>{data.userId}</td>
                {decode.role === 1?                 
                    <td>
                        <button className="btn btn-sm btn-danger" onClick={()=>{window.confirm('delete this item?') && onDelete(data.id)}}>Delete</button>  
                    </td>:false
                }
            </tr>
            )
            })
        }
    }
    return (
        // <button>click me !</button>
        <>
        
        <table className="table table-striped table-bordered">
        <thead>
          <tr>
              {type === "consultation"?decode.role === 3?<th colSpan={columns.length+1}><a className="btn btn-sm btn-primary" href={`consultation/add`}>Add</a></th>:false
              :type === "doctor"?decode.role === 1?<th colSpan={columns.length+1}><a className="btn btn-sm btn-primary" href={`doctor/add`}>Add</a></th>:false:false} 
          </tr>
          <tr  className='text-center'>
        {
        columns?.map((column, index)=>{
            return(
                <th scope="col" key={index}>{column}</th>
            )
        })
        }
          {decode.role === 3 || decode.role === 1? 
            <th>Action</th>:false }
          </tr>
        </thead>
        <tbody>
            { renderElement() }          
        </tbody>
      </table>
      </>
    )
}
}
export default Table