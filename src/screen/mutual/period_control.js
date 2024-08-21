import React from "react";

const PeriodControl = ({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  fetchData,
}) => (
  <div className="my_disp_control_panel">
    <div>Период:</div>
    <div>
      <input
        className="pod_input"
        onChange={(e) => setDateFrom(e.target.value)}
        value={dateFrom}
        type="date"
      />
    </div>
    <div>-</div>
    <div>
      <input
        className="pod_input"
        onChange={(e) => setDateTo(e.target.value)}
        value={dateTo}
        type="date"
      />
    </div>
    <div>
      <button style={{ marginTop: "-5px" }} onClick={fetchData} size="mini">
        Получить данные
      </button>
    </div>
  </div>
);

export default PeriodControl;
