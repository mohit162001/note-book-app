import React from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
function NoteTable({ notes, handleDelete, handleModal }) {
  return (
    <>
    <TableContainer className="notehistory">
      <Table className="notehistory-table">
        <TableHead>
          <TableRow>
            <TableCell>Serial No.</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notes.map((note, index) => (
            <TableRow key={note.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{note.attributes.date}</TableCell>
              <TableCell>{note.attributes.title}</TableCell>
              <TableCell className="notehistory-actions">
                <button className="notehistory-btn">
                  <Link to={`/${note.id}`}>Edit</Link>
                </button>
                <button
                  className="notehistory-btn"
                  onClick={() => handleDelete(note.id, note.attributes.title)}
                >
                  Delete
                </button>
                <button
                  className="notehistory-btn"
                  onClick={() =>
                    handleModal({
                      title: note.attributes.title,
                      content: note.attributes.content,
                    })
                  }
                >
                  View
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </>
  );
}

export default NoteTable;
