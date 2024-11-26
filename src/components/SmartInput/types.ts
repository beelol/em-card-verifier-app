import { Status } from 'src/types/verificationStatus';

export interface ISmartInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (value: string) => void;
  lazyValidator: (value: string) => Promise<void>;
  status?: Status;
  label: string;
  icon?: React.ReactNode;
}
