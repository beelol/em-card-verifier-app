import { Status } from 'src/types/verificationStatus';

export interface ISmartInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  lazyValidator: (value: string) => Promise<void>;
  status?: Status;
  label: string;
  icon?: React.ReactNode;
}
