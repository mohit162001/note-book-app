import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { DELETE_NOTE, GET_NOTES } from "../query/query";
import "./CSS/notehistory.css";
import Modal from "./Modal";
import NoteTable from "./NoteTable";
import NoNote from "./NoNote";
import DeleteDialog from "./DeleteDialog";


function NoteHistory() {
  const [modalDetails, setModalDetails] = useState();
  const id = localStorage.getItem("uid");
  const [selectedNote,setSelectedNote] = useState()
  const [delelteDialogOpen,setDeleteDialogOpen] = useState(false)
  const { data, loading, error, refetch } = useQuery(GET_NOTES, {
    variables: { id: id },
  });

  useEffect(() => {
    refetch()
  }, [refetch]);

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

  function handleDelete(id, title) {
    setSelectedNote({ id, title }); 
    setDeleteDialogOpen(true); 
  }

  function handleConfirmDelete() {
    if (selectedNote) {
      mutationFun({
        variables: {
          id: selectedNote.id,
          title: selectedNote.title,
          deleted_Status: true
        },
      });
      setDeleteDialogOpen(false);
    }
  }
  function handleCancelDelete() {
    setDeleteDialogOpen(false); 
  }
  function handleModal(content) {
    setModalDetails(content);
  }

  function handleClose() {
    setModalDetails(null);
  }

  return (
    <>
      {modalDetails && <Modal handleClose={handleClose} details={modalDetails} />}
      <section className="notehistory">
        {!error && notes.length !== 0 && (
          <h2 className="notehistory-h2">Notes History</h2>
        )}
        {error && <p>Something went wrong</p>}
        {loading && <p>Loading Notes......</p>}
        {!error && !loading && notes.length === 0 && (
          <NoNote/>
        )}
        {!error && notes.length > 0 && (
          <>
            <NoteTable notes={notes} handleDelete={handleDelete} handleModal={handleModal}/>
          </>
        )}
      </section>
      <DeleteDialog open={delelteDialogOpen} handleClose={handleCancelDelete} handleConfirm={handleConfirmDelete} />
    </>
  );
}

export default NoteHistory;
