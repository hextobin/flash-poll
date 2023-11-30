export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="navbar bg-base-100">
        <a
          className="btn btn-ghost shadow-2xl border-4 btn-outline normal-case font-bold text-4xl"
          href="/"
        >
          FlashPoll
        </a>
      </div>
      {children}
    </>
  );
}
