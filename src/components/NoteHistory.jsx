import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { DELETE_NOTE, GET_NOTES } from "../query/query";
import "./CSS/notehistory.css";
import { Link } from "react-router-dom";
import noNotes_img from "../assets/nonotes.png";
import Modal from "./Modal";
function NoteHistory() {
  const [modalDetails, setModalDetails] = useState();
  const id = localStorage.getItem("uid");
  const { data, loading, error,refetch } = useQuery(GET_NOTES, {
    // pollInterval:200,
    variables: { id: id },
  });
  
  useEffect(()=>{
    refetch()
  })
  let notes = [];
  if (data) {
    notes = data.notes.data;
  }

  const [mutationFun] = useMutation(DELETE_NOTE, {
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  function handleDelete(id,title) {
    let text = "Are you sure..?";
    if (window.confirm(text) === true) {
      mutationFun({
        variables: {
          id: id,
          title: title,
          deleted_Status: true
        },
      });
    }
  }

  function handleModal(content) {
    setModalDetails(content);
  }

  function handleClose() {
    setModalDetails(null);
  }

  return (
    <>
      {modalDetails ? <Modal handleClose={handleClose} details={modalDetails} /> :""}
      <section className="notehistory">
        {!error && notes.length !== 0 && (
          <h2 className="notehistory-h2">Notes History</h2>
        )}
        {error && <p>Something went wrong</p>}
        {loading && <p>Loading Notes......</p>}
        {!error && !loading && notes.length === 0 && (
          <div className="nonotes-container">
            <img src={noNotes_img} alt="" />
            <h2 id="nonotes-h2">No Data found</h2>
            <p id="nonotes-p1">
              Create a <span>Note</span> first
            </p>
            <p id="default-p2">
              <button className="create-btn">
                <Link to="/">Create note</Link>
              </button>
            </p>
          </div>
        )}
        {!error && notes.length > 0 && (
          <table className="notehistory-table">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Date</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note, index) => (
                <>
                  <tr key={note.id}>
                    <td>{index + 1}</td>
                    <td>{note.attributes.date}</td>
                    <td>{note.attributes.title}</td>
                    <td className="notehistory-actions">
                      <button className="notehistory-btn"><Link to= {`/${note.id}`}>Edit</Link></button>
                      <button onClick={() => handleDelete(note.id,note.attributes.title)} className="notehistory-btn" >Delete</button>
                      <button onClick={() => handleModal({title: note.attributes.title,content: note.attributes.content })}
                        className="notehistory-btn" >
                        View
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

export default NoteHistory;
