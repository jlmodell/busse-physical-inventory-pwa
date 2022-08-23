import { type Row } from "../server/router/protected-row-data";

import { useState } from "react";

import RowInput from "./data_sheet_row_input";
import LotSelector from "./data_sheet_row_lot_selector";

interface IncomingDataRowProps {
  row: Row;
}

const SheetDataRow: React.FC<IncomingDataRowProps> = ({ row }) => {
  const [state, setState] = useState<Row>(row);

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
        {row.row}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <RowInput
          name="part"
          value={state.part}
          state={state}
          setState={setState}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {/* <RowInput
          name="lot"
          value={state.lot}
          state={state}
          setState={setState}
        /> */}
        <LotSelector
          name="lot"
          value={state.lot}
          state={state}
          setState={setState}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <RowInput
          name="quantity"
          value={state.quantity}
          state={state}
          setState={setState}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <RowInput
          name="uom"
          className="text-gray-500/30"
          value={state.uom}
          state={state}
          setState={setState}
          disabled={true}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <RowInput
          name="total"
          className="text-gray-500/30"
          value={state.total}
          disabled={true}
          state={state}
          setState={setState}
        />
      </td>
    </tr>
  );
};

export default SheetDataRow;
