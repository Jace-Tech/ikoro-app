import { Box, FormControl, IInputProps, Input } from "native-base"
import { useController } from "react-hook-form"

interface AuthInputProps extends IInputProps { 
  control: any;
  name: string;
  rules: any;
}
const AuthInput = ({ control, name, rules, ...rest }: AuthInputProps) => {
  const { field, fieldState: { error } } = useController({ defaultValue: "", control, name, rules })
  return (
    <FormControl isInvalid={Boolean(error)}>
      <Input color={"white"} size={"lg"} py={3} _ios={{ py: 4 }} {...field} onChangeText={field.onChange} {...rest}/>
      <FormControl.ErrorMessage fontSize={"xs"}>{error?.message}</FormControl.ErrorMessage>
    </FormControl>
  )
}

export default AuthInput