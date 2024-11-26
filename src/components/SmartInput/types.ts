import { Status } from 'src/types/verificationStatus';

export interface ISmartInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeValidator: (value: string) => void;
  lazyValidator: (value: string) => Promise<void>;
  status?: Status;
  label: string;
}
