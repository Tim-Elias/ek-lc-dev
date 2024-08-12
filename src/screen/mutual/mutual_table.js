import React from "react";

const MutualTable = ({ data, activeRow, onRowClick, onRowDoubleClick }) => (
  <div className="mutual_table">
    <div className="mutual_table_data">
      <table className="bordered">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Номер</th>
            <th>Заказчик</th>
            <th>Исполнитель</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, index) => {
            const rowClassName = index === activeRow ? "active" : "";

            return (
              <tr
                className={rowClassName}
                key={el.Key}
                onClick={() => onRowClick(index)}
                onDoubleClick={() => onRowDoubleClick(el)}
              >
                <td>{el.Date}</td>
                <td>{el.Number}</td>
                <td>{el.Customer}</td>
                <td>{el.Executor}</td>
                <td>{el.Summ}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default MutualTable;
