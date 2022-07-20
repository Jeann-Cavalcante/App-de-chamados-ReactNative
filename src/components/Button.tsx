import { Heading, IButtonProps, Button as NativeBaseButton } from "native-base";

type Props = IButtonProps & {
  title: string;
}; // extendendo o IButtonProps

export function Button({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      bg="green.700"
      fontSize="sm"
      rounded="sm"
      h={14}
      _pressed={{ bg: "green.500" }}
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {title}
      </Heading>
    </NativeBaseButton>
  );
}
