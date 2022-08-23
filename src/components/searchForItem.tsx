import { trpc } from "../utils/trpc";
import { useState, useCallback, useMemo } from "react";

import { type Item } from "../server/router/protected-sched-data";

const SearchForItemForm: React.FC = () => {
  const [part, setPart] = useState("");

  const details = trpc.useQuery([
    "schedData.getItemByItemNumber",
    { itemNumber: part },
  ]);

  const reset = useCallback(() => {
    setPart("");
  }, [setPart]);

  return (
    <>
      <div className="grid place-items-center text-3xl font-extrabold underline mb-4">
        Sched Data
      </div>
      <div className="pt-6 text-2xl text-blue-400 flex justify-center items-center w-full space-x-2">
        <input
          className="border-gray-300 focus:border-gray-200 border-2 rounded-lg px-7 py-1 w-full text-lg outline-none ring-0"
          placeholder="Enter part number"
          type="text"
          value={part}
          onChange={(e) => setPart(e.target.value)}
        />
        <button
          className="px-2 py-1 text-sm bg-slate-200 rounded-md shadow-md hover:text-red-400 focus:text-red-400 focus:border-1 outline-none ring-0"
          onClick={reset}
        >
          reset
        </button>
      </div>

      <div className="mt-7 w-full">
        {details.data && <ItemCard item={details.data} />}
      </div>
    </>
  );
};

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  const {
    part,
    description,
    each_per_case,
    num_of_dispenser_boxes_per_case,
    gtin,
  } = item;

  return (
    <div className="grid grid-cols-1 divide-y divide-slate-500 p-2 justify-between items-center w-full">
      <table className="table w-full">
        <tbody>
          <tr>
            <td className="whitespace-nowrap px-3 py-4 text-lg text-gray-500">
              <span className="font-bold">Part:</span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-lg text-gray-500">
              {part} - {description}
            </td>
          </tr>
          <tr>
            <td className="whitespace-nowrap px-3 py-4 text-lg text-gray-500">
              <span className="font-bold">Details:</span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-md font-extralight text-gray-500">
              <p>
                <span className="underline">gtin</span>: {gtin}
              </p>
              <p>
                <span className="underline">eaches</span>: {each_per_case}{" "}
                eaches per cs
              </p>
              <p>
                <span className="underline">dispenser boxes</span>:{" "}
                {num_of_dispenser_boxes_per_case} boxes per cs
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="container mx-auto">
        <div className="mt-4">
          <ItemUoMConverter item={item} />
        </div>
      </div>
      <div className="container mx-auto my-4">
        <FindRows part={item.part} />
      </div>
    </div>
  );
};

const ItemUoMConverter: React.FC<{ item: Item }> = ({ item }) => {
  const { each_per_case, num_of_dispenser_boxes_per_case } = item;

  const [qty, setQty] = useState(0);
  const [uom, setUom] = useState("each");

  const memoizedConvertUoM = useMemo(
    () => (uom: string) => {
      if (uom === "each") {
        return each_per_case > 0 ? qty / each_per_case : 0;
      } else if (uom === "box") {
        return num_of_dispenser_boxes_per_case > 0
          ? qty / num_of_dispenser_boxes_per_case
          : 0;
      } else {
        return 0;
      }
    },
    [uom, qty, num_of_dispenser_boxes_per_case, each_per_case]
  );

  const inputQty = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQty(parseInt(e.target.value));
    },
    [setQty]
  );

  const selectUom = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setUom(e.target.value);
    },
    [setUom]
  );

  return (
    <div className="flex flex-col space-y-8 justify-between items-center w-full">
      <div className="text-xl font-semibold underline">UoM Converter</div>
      <div className="flex flex-row space-x-4 w-full">
        <input
          className="border-gray-300 focus:border-gray-200 border-2 rounded-lg px-7 py-1 w-full text-lg outline-none ring-0"
          type="number"
          value={qty}
          step={1}
          min={0}
          onChange={inputQty}
        />
        <select
          className="border-gray-300 focus:border-gray-200 border-2 rounded-lg px-7 py-1 w-full text-lg outline-none ring-0 "
          value={uom}
          onChange={selectUom}
        >
          <option value="each">each</option>
          <option value="box">box</option>
        </select>
      </div>
      {qty > 0 && uom === "each" && each_per_case > 0 ? (
        <div className="flex items-center text-3xl">
          {qty} {uom}es is {memoizedConvertUoM(uom).toFixed(4)} cs
        </div>
      ) : (
        ""
      )}
      {qty > 0 && uom === "box" ? (
        num_of_dispenser_boxes_per_case > 0 ? (
          <div className="flex items-center text-3xl">
            {qty} {uom}es is {memoizedConvertUoM(uom).toFixed(4)} cs
          </div>
        ) : (
          <span className="text-lg text-red-400 font-semibold italic">
            No conversion available
          </span>
        )
      ) : (
        ""
      )}
    </div>
  );
};

const FindRows: React.FC<{ part: string }> = ({ part }) => {
  const rows = trpc.useQuery(["row.findManyByPart", { part }]);
  const { data, error } = rows;

  const sumTotal = useMemo(() => {
    if (data) {
      return data.reduce((acc, row) => acc + row.total, 0);
    } else {
      return 0;
    }
  }, [data]);

  if (error) {
    return <div>error</div>;
  }
  if (!data) {
    return <div>No Rows</div>;
  }
  return (
    <>
      <div className="grid grid-cols-1 divide-y divide-slate-500 p-2 justify-between items-center w-full">
        {data.map((row) => (
          <div key={row.row}>{JSON.stringify(row)}</div>
        ))}
      </div>
      <div>Total: {sumTotal.toFixed(4)}</div>
    </>
  );
};

export default SearchForItemForm;
