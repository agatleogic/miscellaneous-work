import React, { useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const onSubmitData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/todo/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description }),
        }
      );
      const { message } = await response.json();
      alert(message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edite
      </button>
      {/* <!-- The Modal --> */}
      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your list item"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={onSubmitData}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
