import {
  type InputHTMLAttributes,
  type SetStateAction,
  type Dispatch,
} from "react";
import { type BusseUser } from "../types/auth";
import { type Row } from "../server/router/protected-row-data";

import { useSession } from "next-auth/react";
import debounce from "lodash.debounce";
import { trpc } from "../utils/trpc";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
  value: string | number;
  state: Row;
  setState: Dispatch<SetStateAction<Row>>;
}

const RowInput: React.FC<InputProps> = ({
  name,
  className,
  value,
  state,
  setState,
  ...rest
}) => {
  const inputType = ["quantity", "total"].includes(name) ? "number" : "text";
  const mutation = trpc.useMutation(["row.updateOne"]);
  const userData = useSession()?.data?.user as BusseUser;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    const inputType = ["quantity", "total"].includes(name) ? "number" : "text";

    if (inputType === "number") {
      setState({
        ...state,
        quantity: parseInt(value),
        total: parseInt(value),
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }

    debouncedMutation(e);
  };

  const debouncedMutation = debounce((e) => {
    let { name, value } = e.target;
    const inputType = ["quantity", "total"].includes(name) ? "number" : "text";

    if (inputType === "number") {
      mutation.mutate({
        ...state,
        last_modified_by: userData?.Email as string,
        quantity: parseInt(value),
        total: parseInt(value),
      });
    } else {
      mutation.mutate({
        ...state,
        last_modified_at: new Date(),
        last_modified_by: userData?.Email as string,
        [name]: value,
      });
    }
  }, 500);

  return (
    <input
      type={inputType}
      name={name}
      placeholder={name.toUpperCase()}
      className={clsx(
        "bg-white focus:outline-none focus:shadow-outline border border-gray-300 focus:border-slate-800 rounded-lg py-2 px-4 block w-full appearance-none leading-normal",
        className && className
      )}
      onChange={handleChange}
      value={value}
      {...rest}
    />
  );
};

export default RowInput;
