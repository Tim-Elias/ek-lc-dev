import React from "react";

const DispatchTable = ({ dispatches, onDoubleClick }) => (
  <table className="bordered">
    <thead>
      <tr>
        <th>
          <div className="small_table_data">Дата</div>
        </th>
        <th>
          <div className="small_table_data">Накладная</div>
        </th>
        <th>
          <div className="small_table_data">Город отправителя</div>
        </th>
        <th>
          <div className="small_table_data">Город получателя</div>
        </th>
        <th>
          <div className="small_table_data">Мест</div>
        </th>
        <th>
          <div className="small_table_data">Вес</div>
        </th>
        <th>
          <div className="small_table_data">Вид доставки</div>
        </th>
        <th>
          <div className="small_table_data">Сумма</div>
        </th>
      </tr>
    </thead>
    <tbody>
      {dispatches.map((el, index) => (
        <tr key={index} onDoubleClick={() => onDoubleClick(el)}>
          <td>
            <div className="small_table_data">{el.Date}</div>
          </td>
          <td>
            <div className="small_table_data">{el.Num}</div>
          </td>
          <td>
            <div className="small_table_data">{el.SendCity}</div>
          </td>
          <td>
            <div className="small_table_data">{el.RecCity}</div>
          </td>
          <td>
            <div className="small_table_data">{el.Total}</div>
          </td>
          <td>
            <div className="small_table_data">{el.Weight}</div>
          </td>
          <td>
            <div className="small_table_data">{el.DelMethod}</div>
          </td>
          <td>
            <div className="small_table_data">{el.Summ}</div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DispatchTable;
