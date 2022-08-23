import {
  type Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/router";
import { Dialog, Transition, Combobox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";

const sheets = Array.from(Array(715).keys()).map((i) => (i + 1).toString());

const ChooseSheetButton = () => {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  useHotkeys("ctrl+enter", handleClick);

  return (
    <>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-lg border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
        onClick={handleClick}
      >
        Choose Sheet{" "}
        <span className="font-extrabold ml-4 italic">
          hotkey: <kbd>ctrl</kbd> + <kbd>enter</kbd>
        </span>
      </button>
      <ChooseSheetModal open={open} setOpen={setOpen} />
    </>
  );
};

interface ChooseSheetModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SheetComboBox = ({
  setOpen,
  sheet,
  setSheet,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  sheet: string;
  setSheet: Dispatch<SetStateAction<string>>;
}) => {
  const router = useRouter();

  const handleSheetChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSheet(e.target.value);
      router.prefetch(`/sheet/${sheet}`);
    },
    [setSheet]
  );

  const filteredSheet =
    sheet === ""
      ? [...sheets.slice(0, 5), ...sheets.slice(710, 715)]
      : sheets.filter((s) => s.startsWith(sheet)).slice(0, 10);

  const gotoSheet = () => {
    router.push(`/sheet/${sheet}`);
    setOpen(false);
  };

  return (
    <form
      className="grid grid-cols-4 place-items-center"
      onSubmit={gotoSheet}
      onReset={() => setSheet("")}
    >
      <div className="col-span-3">
        <Combobox value={sheet} onChange={setSheet}>
          <Combobox.Input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 focus:border-slate-800 rounded-lg py-2 px-4 block w-full appearance-none leading-normal text-center w-full"
            onChange={handleSheetChange}
          />
          <Combobox.Options>
            {filteredSheet.map((sheet) => (
              <Combobox.Option
                className="cursor-pointer hover:bg-slate-200"
                key={sheet}
                value={sheet}
              >
                Sheet #{sheet}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      </div>
      <button
        type="submit"
        disabled={!sheet || parseInt(sheet) < 1 || parseInt(sheet) > 715}
        className="bg-teal-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={gotoSheet}
      >
        Go
      </button>
    </form>
  );
};

const ChooseSheetModal: React.FC<ChooseSheetModalProps> = ({
  open,
  setOpen,
}) => {
  const router = useRouter();
  const [sheet, setSheet] = useState((router.query.sheet as string) || "");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Choose a Sheet
                    </Dialog.Title>
                    <div className="mt-2 grid place-items-center">
                      <p className="text-sm text-gray-500">
                        Select a sheet to continue.
                      </p>
                      <p className="text-sm text-gray-500">
                        There are {sheets.length} sheets in the database.
                      </p>
                      <div className="mt-4">
                        <SheetComboBox
                          setOpen={setOpen}
                          sheet={sheet}
                          setSheet={setSheet}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Go back
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ChooseSheetButton;
