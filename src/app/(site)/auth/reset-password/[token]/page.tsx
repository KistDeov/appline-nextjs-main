import ResetPassword from "@/components/Auth/ResetPassword";
import axios from "axios";
import { redirect } from "next/navigation";

type PropsType = {
  params: Promise<{ token: string }>;
};

export default async function Page(props: PropsType) {
  const params = await props.params;

  let userEmail;

  try {
    userEmail = await verifyToken(params.token);
  } catch (error) {
    // Cannot call client-side toast on the server — just redirect the user.
    // Client can show a message after redirect if needed.
    redirect("/auth/forget-password");
  }

  return <ResetPassword userEmail={userEmail} />;
}

const verifyToken = async (token: string) => {
  const res = await axios.post("/api/forget-password/verify-token", {
    token,
  });

  return res.data.email;
};
