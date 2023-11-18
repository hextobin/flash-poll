import "../public/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="navbar bg-base-100">
        <a
          className="btn btn-ghost border-4 btn-outline normal-case font-black text-4xl"
          href="/"
        >
          FlashPoll
        </a>
      </div>
      <div className="content-wrapper">{children}</div>
    </>
  );
}
