import { useMutation } from "@apollo/client";
import React from "react";
import "./CSS/note.css";
import { CREATE_NOTE, UPDATE_NOTE } from "../query/query";
import { useNavigate } from "react-router-dom";

function Note({ data }) {
// if(data){
//   console.log(data.note.data.id)
// }
  const navigate = useNavigate();
  const [mutationFun] = useMutation(CREATE_NOTE, {
    onCompleted(data) {
      console.log(data);
      window.alert("Note created");
      setTimeout(() => {
        navigate("/history");
      }, 1000);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [updateFun] = useMutation(UPDATE_NOTE, {
    onCompleted(data) {
      console.log(data);
      window.alert("Note updated");
      setTimeout(() => {
        navigate("/history");
      }, 1000);
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

    console.log(title);
    console.log(content);
    console.log(date)

    if(data){
      if (title === "") {
        window.alert("note cannot has empty title");
      } else {
        console.log("id from inside ",data.note.data.id)
        updateFun({
          variables: {
            noteId: data.note.data.id,
            title:title,
            content:content,
            date:date,
            id:id
          }
        });
      }
    }else{
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
  }

  return (
    <>
      <div className="note-container">
        <h2 className="note-h2">Create your note here</h2>
        <div className="note-form-container">
          <form className="note-form" onSubmit={handleSubmit}>
            <div className="note-title">
              <label className="title-lable">Title</label>
              <input
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
             <button className="note-submit" type="submit" >
                Update
              </button>
            ) : (
              <button className="note-submit" type="submit">
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
