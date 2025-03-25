import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface DynamicSelectProps {
  label: string;
  placeholder: string;
  options: string[];  // Array of options
  value: string;
  onChange: (value: string) => void;
  className?: string
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({ label, placeholder, options, value, onChange,className }) => {
  return (
    <div>
      <label className={`text-sm text-gray-600 ${className}`}>{label}</label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className={`w-full text-gray-600 ${className}`}>
          <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DynamicSelect;
