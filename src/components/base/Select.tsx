import { SelectArrows } from '@/components/icons/SelectArrows';

export interface SelectOptions {
  title: string;
  value: string;
}

interface SelectProps {
  options: SelectOptions[];
  selectedValue: string;
  placeholder: string;
  onChange: (selectedValue: string) => void;
}

export const Select = ({ options, selectedValue, placeholder, onChange }: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(event.target.value);

  return (
    <div className="relative w-full">
      <select
        className="border-select-border rounded-select w-full appearance-none border-1 p-4 text-sm font-medium"
        value={selectedValue}
        onChange={handleChange}
      >
        <option
          value=""
          disabled
          hidden
        >
          {placeholder}
        </option>

        {options.map(({ title, value }) => (
          <option
            key={value}
            value={value}
          >
            {title}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6">
        <SelectArrows />
      </div>
    </div>
  );
};
