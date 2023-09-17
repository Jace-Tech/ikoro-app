import { Box, FormControl, ISelectProps, Select } from "native-base"
import { useController } from "react-hook-form"

interface AuthSelectProps extends ISelectProps { 
  control: any;
  name: string;
  rules: any;
  data: { value: string; label: string }[];
}
const AuthSelect = ({ control, name, data, rules, ...rest }: AuthSelectProps) => {
  const { field, fieldState: { error } } = useController({ defaultValue: "", control, name, rules })
  return (
    <FormControl isInvalid={Boolean(error)}>
      <Select color={"white"} size={"lg"} {...(field as any)} onValueChange={field.onChange} {...rest}>
        { data.map(item => (<Select.Item key={item.label} {...item} />)) }
      </Select>
      <FormControl.ErrorMessage fontSize={"xs"}>{error?.message}</FormControl.ErrorMessage>
    </FormControl>
  )
}

export default AuthSelect