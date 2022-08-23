import {
  type InputHTMLAttributes,
  type SetStateAction,
  type Dispatch,
} from "react";
import { type BusseUser } from "../types/auth";
import { type Sheet } from "../server/router/protected-sheet-data";

import debounce from "lodash.debounce";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
  value: string | number;
  state: Sheet;
  setState: Dispatch<SetStateAction<Sheet>>;
}

const SheetInput: React.FC<InputProps> = ({
  name,
  className,
  value,
  state,
  setState,
  ...rest
}) => {
  const mutation = trpc.useMutation(["sheet.updateOne"]);
  const userData = useSession()?.data?.user as BusseUser;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });

    debouncedMutation(e);
  };

  const debouncedMutation = debounce((e) => {
    let { name, value } = e.target;

    mutation.mutate({
      ...state,
      last_modified_by: userData?.Email as string,
      [name]: value,
    });
  }, 500);

  return (
    <input
      type="text"
      name={name}
      placeholder={name.toUpperCase()}
      className={clsx(
        "bg-white focus:outline-none focus:shadow-outline focus:border-slate-800 border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal",
        className && className
      )}
      onChange={handleChange}
      value={value}
      {...rest}
    />
  );
};

export default SheetInput;
