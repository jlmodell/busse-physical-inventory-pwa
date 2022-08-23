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

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  className?: string;
  value: string;
  state: Row;
  setState: Dispatch<SetStateAction<Row>>;
}

const LotSelector: React.FC<SelectProps> = ({
  name,
  className,
  value,
  state,
  setState,
  ...rest
}) => {
  const mutation = trpc.useMutation(["row.updateOne"]);
  const userData = useSession()?.data?.user as BusseUser;

  const lot = trpc.useQuery(["lot.find", { part: state.part }]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    <select
      name={name}
      className={clsx(
        "bg-white focus:outline-none focus:shadow-outline focus:border-slate-800 border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal",
        className && className
      )}
      onChange={handleChange}
      value={value}
      {...rest}
    >
      <option value="">Select a Lot</option>
      <option value=""></option>
      {lot?.data?.map((l) => (
        <option key={l.lot} value={l.lot}>
          {l.lot}
        </option>
      ))}
    </select>
  );
};

export default LotSelector;
