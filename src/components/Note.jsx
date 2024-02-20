import { useMutation } from "@apollo/client";
import React from "react";

import { CREATE_NOTE } from "../query/query";

function Note() {
  const [mutationFun, {}] = useMutation(CREATE_NOTE, {
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
      <div className="note-container">
        <form className="note-form" onSubmit={handleSubmit}>
          <h2>Create your new note here</h2>
          <div className="form-group">
            <label htmlFor="username">Title</label>
            <input
              className="note-input "
              type="text"
              id="title"
              name="title"
              placeholder="note title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Content</label>
            <textarea
              className="note-input"
              rows={20}
              cols={60}
              id="content"
              name="content"
              placeholder="content"
            />
          </div>
          <button type="submit" className="note-btn">
            Sumbit
          </button>
        </form>
      </div>
    </>
  );
}

export default Note;
