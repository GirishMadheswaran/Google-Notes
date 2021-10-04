import React from "react";
import "./App.css";
// import rectimg from'./img/download.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      note: "",
      notes: [],
      editIndex: "",
      label: [],
    };
  }

  handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { title, note, notes, editIndex } = this.state;
    if (editIndex === "") {
      const obj = { title: title, note: note, color: "white" };
      notes.push(obj);
      this.setState({
        title: "",
        note: "",
        notes,
        editIndex: "",
      });
    } else {
      notes[editIndex] = { ...notes[editIndex], title: title, note: note };
      this.setState({
        title: "",
        note: "",
        notes,
        editIndex: "",
      });
    }
  };

  noteDelete = (index) => {
    const { notes } = this.state;
    notes.splice(index, 1);
    this.setState({
      notes,
    });
  };

  editNote = (editIndex, title, note) => {
    this.setState({
      editIndex,
      title,
      note,
    });
  };

  colorChange = (event, index) => {
    const { notes } = this.state;
    const {
      target: { value },
    } = event;
    notes[index] = { ...notes[index], color: value };
    this.setState({
      notes,
    });
  };

  notesCard = () => {
    const { notes } = this.state;
    let returnView;
    if (notes.length) {
      returnView = (
        <>
          <div className="body">
            {notes.map((value, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: value.color,
                  }}
                  className="notes"
                  >
                    <h2>{value.title}</h2>
                    <p>{value.note}</p>
                    <div className="flexColor">
                      <label>Color:</label>
                      <input
                        type="color"
                        name="favcolor"
                        value={value.color}
                        onChange={(e) => this.colorChange(e, index)}
                      />
                    </div>
                    <div className="buttonFlex">
                      <button
                        onClick={() => this.editNote(index, value.title, value.note)}
                      >
                        Edit
                      </button>
                      <button onClick={() => this.noteDelete(index)}>Delete</button>
                    </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }
    return returnView;
  };
  render = () => {
    const { title, note } = this.state;
    return (
      <>
        <div className="content">
          <div className="header">
            <h1>Google Notes</h1>
            {/* <img alt="logo" src={rectimg}></img> */}
          </div>
          <div className="input-box">
              <input  
                name="title" 
                type="text" 
                value={title} 
                placeholder="Title"
                onChange={(e) => this.handleChange(e)}>
              </input>
              <textarea  
                name="note" 
                value={note} 
                placeholder="Note"
                onChange={(e) => this.handleChange(e)}>
              </textarea>
              <button type="button" onClick={() => this.handleClick()}>Add Notes</button>
          </div>
        </div>

        {/* Notes */}
        {this.notesCard()}
      </>
    );
  };
}
export default App;