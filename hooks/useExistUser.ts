import { useQuery } from "@tanstack/react-query";
import { valueExists } from "@/firebase";

export const useExistUser = (value: string) => {
  const result = useQuery({
    queryKey: ["existUser"],
    queryFn: () => valueExists("apply", "phone", value),
  });
  return result;
};
