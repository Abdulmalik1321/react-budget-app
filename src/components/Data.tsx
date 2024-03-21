import { DataProp } from "./types";

export function Data({ toRender, handleDelete, handleEdit }: DataProp) {
  return (
    <li id={`${toRender.id}`} className="li__data">
      <span>{toRender.source}</span>
      <span>{Number(toRender.amount).toLocaleString()}</span>
      <span>{toRender.date}</span>
      {(() => {
        if (handleDelete && handleEdit) {
          return (
            <div>
              <button onClick={(e) => handleDelete(e, toRender.id)}>
                Delete
              </button>
              <button onClick={(e) => handleEdit(e, toRender)}>Edit</button>
            </div>
          );
        } else {
          return <span>{toRender.category}</span>;
        }
      })()}
    </li>
  );
}
