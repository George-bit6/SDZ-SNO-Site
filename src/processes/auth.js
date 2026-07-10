import supabase from "../../supabase";

export async function getUserId() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Get user id error:", error.message);
    return null;
  }
  return user?.id ?? null;
}

export async function submit(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login error:", error.message);
    return false;
  }

  console.log("Login data:", data?.user);

  return true;
}

