export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-12 lg:p-32">
      <div className="text-center max-w-3xl pb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to Balorank
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Whether you&apos;re a seasoned player or a newcomer, our wiki is
          designed to provide comprehensive information on all aspects of the
          game.
        </p>
      </div>

      <div className="grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <a
          href="/Agents"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-100 hover:bg-muted hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Agents{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about each agent&apos;s abilities, roles, and strategies to
            maximize their potential in your team.
          </p>
        </a>

        <a
          href="/Weapons"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-muted hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Weapons{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore the diverse arsenal of Valorant, including detailed
            statistics and usage tips for each weapon.
          </p>
        </a>

        <a
          href="/Maps"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-muted hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Maps{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Get insights into the various maps, including key locations,
            strategic tips, and map-specific tactics.
          </p>
        </a>
      </div>
    </main>
  );
}
