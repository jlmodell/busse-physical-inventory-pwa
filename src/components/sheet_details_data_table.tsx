import { type Sheet } from "../server/router/protected-sheet-data";

import SheetDataRows from "./sheet_details_data_row";

interface IncomingSheetDataRowProps {
  sheet: Sheet;
}

const SheetDetailsDataTable: React.FC<IncomingSheetDataRowProps> = ({
  sheet,
}) => {
  if (!sheet) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Sheet
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Owner
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sheet && <SheetDataRows sheet={sheet} />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheetDetailsDataTable;
