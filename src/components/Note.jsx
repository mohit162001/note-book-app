import { useMutation } from "@apollo/client";
import React from "react";
import './CSS/note.css'
import { CREATE_NOTE } from "../query/query";

function Note() {
  const [mutationFun,{}] = useMutation(CREATE_NOTE, {
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
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

    console.log(typeof id);

    console.log(title, content, date);

    if (title === "") {
      window.alert("note cannot has empty title");
    } else {
      mutationFun({
        variables: {
          title,
          content,
          date,
          id,
        },
      });
    }
  }

  return (
    <>
      <div className="note-container" >
      <h2 className="note-h2">Create your note here</h2>
        <div className="note-form-container">
        <form className="note-form"  onSubmit={handleSubmit}>
         
          <div  className="note-title">
            <label className="title-lable" >Title</label>
            <input
              className="title-input"
              type="text"
              id="title"
              name="title"
              placeholder="note title"
            />
          </div>
          <div >
            <label className="content-lable">Content</label>
            <textarea
              rows={20}
              cols={80}
              id="content"
              name="content"
              placeholder="content...."
            />
          </div>
          <button className="note-submit" type="submit">
            Sumbit
          </button>
        </form>
        </div>
      </div>
    </>
  );
}

export default Note;
