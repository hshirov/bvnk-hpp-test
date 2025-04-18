import { SelectArrowsIcon } from '@/components/icons/SelectArrowsIcon';

export interface SelectOptions {
  title: string;
  value: string;
}

interface SelectProps {
  options: SelectOptions[];
  value: string;
  placeholder: string;
  onChange: (selectedValue: string) => void;
}

export const Select = ({ options, value, placeholder, onChange }: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(event.target.value);

  return (
    <div className="relative w-full">
      <select
        className="border-light-border rounded-select focus:ring-primary focus:border-primary w-full appearance-none border-1 p-4 text-sm focus:ring-1 focus:outline-none"
        value={value}
        onChange={handleChange}
      >
        <option
          value=""
          disabled
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
        <SelectArrowsIcon />
      </div>
    </div>
  );
};
