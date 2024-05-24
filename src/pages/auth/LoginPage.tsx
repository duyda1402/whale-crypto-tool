import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthFirebase from "../../hooks/useAuthFirebase";
import { Controller, useForm } from "react-hook-form";

type Props = {};

type FormLogin = {
  email: string;
  password: string;
  displayName?: string;
  isAccept?: boolean;
};

function LoginPage({}: Props) {
  const authFirebase = useAuthFirebase();
  const [type, toggle] = useToggle(["login", "register"]);
  const navigate = useNavigate();
  // Hook Form Init
  const { control, handleSubmit } = useForm<FormLogin>({
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
      isAccept: false,
    },
  });

  const onSubmit = (data: FormLogin) => {
    if (type === "login") {
      authFirebase.loginWithEmailPassword(data);
    }
    if (type === "register") {
      authFirebase.registerWithEmailPassword(data);
    }
  };

  useEffect(() => {
    if (!authFirebase.loading && authFirebase.user) {
      return navigate("/");
    }
  }, [authFirebase]);

  return (
    <Center h="100vh">
      <Paper radius="md" p="xl" withBorder miw={400}>
        <Text size="lg" fw={600}>
          Welcome to {import.meta.env.VITE_APP_TITLE!}, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <Button
            onClick={authFirebase.signInWithGoogle}
            color="gray.4"
            radius="xl"
            variant="outline"
            loading={authFirebase.loading}
            leftIcon={
              <Image
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                height={24}
                width={24}
              />
            }
          >
            <Text color="gray.7">Google</Text>
          </Button>
          <Button
            color="gray.4"
            radius="xl"
            variant="outline"
            loading={authFirebase.loading}
          >
            <Text color="gray.7">Use as Guest</Text>
          </Button>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />
        {authFirebase.error && (
          <Text align="center" fz="sm" color="red">
            {authFirebase.error?.code === "auth/user-not-found"
              ? "Email or password is incorrect!"
              : "Something went wrong!"}
          </Text>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            {type === "register" && (
              <Controller
                control={control}
                name="displayName"
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextInput
                    label="Name"
                    placeholder="Your name"
                    {...field}
                    error={invalid ? error?.message : undefined}
                    radius="md"
                  />
                )}
              />
            )}

            <Controller
              control={control}
              name="email"
              rules={{
                required: "Required",
                validate: {
                  validateEmail: (value) => {
                    var re = /^\S+@\S+$/;
                    return re.test(value) || "Invalid email";
                  },
                },
              }}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextInput
                  {...field}
                  required
                  label="Email"
                  placeholder="Example@email.com"
                  error={invalid ? error?.message : undefined}
                  radius="md"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Required",
                validate: {
                  greaterThan: (value) =>
                    value.length >= 8 || "Should be greater than 8 charter",
                },
              }}
              render={({ field, fieldState: { invalid, error } }) => (
                <PasswordInput
                  {...field}
                  required
                  label="password"
                  placeholder="Your password"
                  error={invalid ? error?.message : undefined}
                  radius="md"
                />
              )}
            />

            {type === "register" && (
              <Controller
                control={control}
                name="isAccept"
                rules={{ required: "Should be accept" }}
                render={({
                  field: { value, onChange },
                  fieldState: { invalid, error },
                }) => (
                  <Checkbox
                    label="I accept terms and conditions"
                    error={invalid ? error?.message : undefined}
                    checked={value}
                    onChange={(event) => onChange(event.currentTarget.checked)}
                  />
                )}
              />
            )}
          </Stack>

          <Flex justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" loading={authFirebase.loading}>
              {upperFirst(type)}
            </Button>
          </Flex>
        </form>
      </Paper>
    </Center>
  );
}

export default LoginPage;
