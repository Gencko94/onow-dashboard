import { useMutation, useQueryClient } from "react-query";
import { useHistory, useLocation } from "react-router";
import { userLogin } from "../../utils/queries";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const location = useLocation<{ state: string }>();

  const { mutateAsync, isLoading } = useMutation(userLogin, {
    onSuccess: (data) => {
      localStorage.setItem("dshtid", data.result.token);
      queryClient.setQueryData("auth", data.result.userInfo);
      history.replace(location.state ?? "/dashboard");
      if (location.state) {
        history.push(location.state);
        console.log(location.state);
      } else {
        console.log("hi");
      }
    },
  });

  return { mutateAsync, isLoading };
};
