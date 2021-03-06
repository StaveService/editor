import fs from "fs";
import React, {
  KeyboardEvent,
  ChangeEvent,
  useState,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import path from "path";
import TextField from "@material-ui/core/TextField";

interface IInputProps {
  readonly inputType: "file" | "folder";
  readonly filePath: string;
  readonly setActiveInput: Dispatch<SetStateAction<boolean>>;
  readonly setFiles: Dispatch<SetStateAction<string[]>>;
}

const Input = ({
  inputType,
  filePath,
  setActiveInput,
  setFiles,
}: IInputProps) => {
  const [value, setValue] = useState("");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      if (!value) {
        setActiveInput(false);
        return;
      }
      const filesPath = path.join(filePath, value);
      if (inputType === "folder") fs.mkdirSync(filesPath);
      if (inputType === "file") fs.writeFileSync(filesPath, "");
      setFiles(fs.readdirSync(filePath));
      setValue("");
      setActiveInput(false);
    },
    [filePath, inputType, setActiveInput, setFiles, value]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  return (
    <li className="Input">
      <TextField
        id="filled-basic"
        variant="filled"
        label={`New ${inputType}`}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        fullWidth
      />
    </li>
  );
};

interface IInputsProps extends IInputProps {
  isActiveInput: boolean;
}

const Inputs = ({ inputs }: { inputs: IInputsProps[] }) => {
  const inputItems = inputs.map(
    ({ inputType, filePath, isActiveInput, setActiveInput, setFiles }) =>
      isActiveInput && (
        <Input
          key={filePath + inputType}
          inputType={inputType}
          filePath={filePath}
          setActiveInput={setActiveInput}
          setFiles={setFiles}
        />
      )
  );
  return <>{inputItems}</>;
};

export default Inputs;
