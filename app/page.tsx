import { cookies } from 'next/headers'

import MainPage from "./components/MainPage";

export default async function Home() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('auth')?.value || null
  const userId = cookieStore.get('userId')?.value || null

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <MainPage authToken={auth} userId={userId} />
    </div>
  );
}