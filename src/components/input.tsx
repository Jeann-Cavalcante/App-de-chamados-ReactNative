import { IInputProps, Input as NativeBaseinput } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseinput
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        borderBottomWidth: 1,
        borderColor: "green.500",
        bg: "gray.700",
      }}
      {...rest}
    />
  );
}
