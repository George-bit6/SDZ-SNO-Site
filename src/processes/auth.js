import supabase from "../../supabase";

async function submit(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    return false;
  }

  console.log("Login data:", data?.user);
  return true;
}

export default submit;
