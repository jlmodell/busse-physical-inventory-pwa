import { useState } from "react";

import { type Sheet } from "../server/router/protected-sheet-data";

import SheetInput from "./sheet_details_data_row_input";

interface IncomingSheetDataRowProps {
  sheet: Sheet;
}

const SheetDataRows: React.FC<IncomingSheetDataRowProps> = ({ sheet }) => {
  const [state, setState] = useState<Sheet>(sheet);

  return (
    <tr>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <SheetInput
          name="sheet"
          value={state.sheet}
          state={state}
          setState={setState}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <SheetInput
          name="owner"
          value={state.owner}
          state={state}
          setState={setState}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <SheetInput
          name="location"
          value={state.location}
          state={state}
          setState={setState}
        />
      </td>
    </tr>
  );
};

export default SheetDataRows;
