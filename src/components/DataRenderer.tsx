import { Data } from "./Data";
import { IncExpData, DataRendererProp } from "./types";

export function DataRenderer({
  dataToRender,
  handleDelete,
  handleEdit,
}: DataRendererProp) {
  return (
    <div className="render__wrap">
      <div className="IncomeTitles">
        <span>Source</span>
        <span>Amount</span>
        <span>Date</span>
        <span>{handleDelete ? "Delete/Edit" : "Category"}</span>
      </div>
      <ul className="data__wrap">
        {dataToRender.map((data: IncExpData) => {
          return (
            <Data
              key={data.id}
              toRender={data}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
    </div>
  );
}
