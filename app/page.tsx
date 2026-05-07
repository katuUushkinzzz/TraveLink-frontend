import MainPage from "./components/MainPage";

export default function Home() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <MainPage />
    </div>
  );
}