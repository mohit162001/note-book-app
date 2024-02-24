import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import "./CSS/note.css";
import { CREATE_NOTE, UPDATE_NOTE } from "../query/query";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from "react";
import { TextContext } from "../Context/NoteBookContext";


function Note({ data }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [isTitleEmpty,setIsTitleEmpty] = useState(true);
  const {handleTextChange} = useContext(TextContext)
  const navigate = useNavigate();
  const [mutationFun] = useMutation(CREATE_NOTE, {
    onCompleted(data) {
      console.log(data);
      handleSnackbarOpen('success', 'New Note create Successfully');
      setTimeout(() => {
        navigate("/history");
      }, 1500);
    },
    onError(error) {
      handleSnackbarOpen('error', 'Something went wrong');
    },
  });

  const [updateFun,{error}] = useMutation(UPDATE_NOTE, {
    onCompleted(data) {
      console.log(data);
      handleSnackbarOpen('success', 'Note Updated Successfully');
      setTimeout(() => {
        navigate("/history");
      }, 1500);
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const content = formData.get("content");
    const currDate = new Date();
    const date = currDate.toLocaleDateString();
    const id = localStorage.getItem("uid");

    console.log(title);
    console.log(content);
    console.log(date)

    if(data){
      if (title === "") {
        handleSnackbarOpen('warning', 'Note title cannot be empty');
      }else if(error){
        handleSnackbarOpen('info', 'Unable to create note \n Please try again later');
      } else {
        updateFun({
          variables: {
            noteId: data.note.data.id,
            title:title,
            content:content,
            date:date,
            id:id,
            deleted_Status: false
          }
        });
      }
    }else{
      if (title === "") {
        handleSnackbarOpen('warning', 'Note title cannot be empty');
      } else {
        mutationFun({
          variables: {
            title,
            content,
            date,
            id,
            deleted_Status: false
          },
        });
      }
    }
  }
  function handleTitleChange(event){
    if(event.target.value !==''){
      setIsTitleEmpty(false)
    }else{
      setIsTitleEmpty(true)
    }
  }
  const handleSnackbarOpen = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
    <Snackbar open={open} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{vertical:"top",horizontal:"center"}}>
        <MuiAlert elevation={6}  onClose={handleSnackbarClose} severity={severity} sx={{fontSize: "1.4rem",width:"100%",}}>
         {message}
       </MuiAlert>
    </Snackbar>
      <div className="note-container">
        <h2 className="note-h2">Create your note here</h2>
        <div className="note-form-container">
          <form className="note-form" onSubmit={handleSubmit}>
            <div className="note-title">
              <label className="title-lable">Title</label>
              <input
                onChange={handleTitleChange}
                className="title-input"
                type="text"
                id="title"
                name="title"
                placeholder="note title"
                defaultValue={data ? data.note.data.attributes.title : ""}
              />
            </div>
            <div>
              <label className="content-lable">Content</label>
              <textarea
                rows={20}
                cols={80}
                id="content"
                name="content"
                placeholder="content...."
                defaultValue={data ? data.note.data.attributes.content : ""}
              />
            </div>
            {data ? (
             <div className="note-update-action">
             <button className="note-submit" type="submit" >
                Update
              </button>
              <button className="note-update-cancle" type="button" >
                <Link onClick={()=>handleTextChange(true)} to='/'>Cancle</Link>
              </button>
             </div>
            ) : (
              <button disabled={isTitleEmpty} className={isTitleEmpty?'note-submit-inactive':"note-submit"} type="submit">
              Submit
            </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Note;
