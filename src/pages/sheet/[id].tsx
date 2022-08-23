import { type Row } from "../../server/router/protected-row-data";
import { type Sheet } from "../../server/router/protected-sheet-data";

import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

import SheetDetailsDataTable from "../../components/sheet_details_data_table";
import SheetDataTable from "../../components/data_table";

const Sheet = () => {
  const router = useRouter();

  const { id } = router.query;

  const sheet = trpc.useQuery([
    "sheet.findOne",
    { sheet: parseInt(id as string) },
  ]);

  const rows = trpc.useQuery([
    "row.find",
    {
      sheet: parseInt(id as string),
    },
  ]);

  return (
    <>
      <div className="container flex flex-col items-center justify-center mt-4 md:mt-8 ring-1 ring-black space-y-2 py-2">
        <h1 className="text-xl font-extrabold underline">
          P.I. (2022) Sheet #{id}
        </h1>
        {sheet && <SheetDetailsDataTable sheet={sheet.data as Sheet} />}
      </div>

      {rows && rows.data && (
        <div>
          <SheetDataTable rows={rows.data as Row[]} />
        </div>
      )}
    </>
  );
};

export default Sheet;
