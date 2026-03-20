  import CheckboxField from "./components/CheckboxField";
  import RadioField from "./components/RadioField";
  import SelectField from "./components/SelectField";
  import TextField from "./components/TextinputField";
  import TagsField from "./components/TagField";

  const registry = {
      select: SelectField,
      radio: RadioField,
      checkbox: CheckboxField,
      tags: TagsField,
      text: TextField,
      number : TextField,
      email: TextField,
      password: TextField,
      confirmPassword: TextField,
    }

  function FormField({ field, value, error, onChange, onBlur, data }){
    const Component = registry[field.type];

    if (!Component) {
      return <div>Unsupported field type: {field.type}</div>;
    }

    return (
        <Component
          field={field}
          value={value}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
          data={data}
        />
    )
  }

  export default FormField;