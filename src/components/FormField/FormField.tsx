const FormField: React.FC<{ label: string; name: string; defaultValue?: string; required?: boolean }> = ({ label, name, defaultValue, required }) => (
  <label>
    {label}:
    <input name={name} defaultValue={defaultValue} required={required} />
  </label>
);

export default FormField;
