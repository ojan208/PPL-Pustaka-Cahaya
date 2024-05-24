import * as React from "react";

function IconCard() {
  return (
    <div className="flex flex-col flex-1 justify-center rounded-lg border border-black border-solid">
      <div className="shrink-0 rounded-lg bg-zinc-300 h-[58px]" />
    </div>
  );
}

function Login() {
  return (
    <div className="flex flex-col justify-center bg-white">
      <section className="flex flex-col items-center px-16 pt-20 w-full mix-blend-darken bg-zinc-300 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col mt-32 max-w-full w-[1092px] max-md:mt-10">
          <form
            className="flex flex-col self-center pt-2.5 pb-7 max-w-full bg-white w-[500px]"
            aria-label="Login Form"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/104e214b98d8d6288f5f9bb94568bd7a6d050f85b7731f3c66586af831b78c4c?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
              alt=""
              className="self-end aspect-[1.12] w-[18px] max-md:mr-2.5"
            />
            <div className="flex flex-col items-center pr-2.5 pl-16 mt-8 max-md:pl-5 max-md:max-w-full">
              <h1 className="text-3xl font-semibold text-center text-black">
                Masuk ke Pustaka Cahaya
              </h1>
              <div className="flex overflow-hidden relative flex-col justify-center items-center self-start px-14 py-3 mt-8 max-w-full aspect-[5.24] w-[351px] max-md:px-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a50641814becce94db1d18715ceacc872432dc7dac1092efea7dd19327323a28?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
                  alt=""
                  className="object-cover absolute inset-0 size-full"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/22cddc92a56a10617b25977e852049e8fd15c14107d3ae79ea6eabe19f2e504b?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
                  alt=""
                  className="w-full aspect-[5.56]"
                />
              </div>
              <fieldset className="flex gap-3 self-start mt-12 text-lg text-center whitespace-nowrap text-black text-opacity-50 max-md:flex-wrap max-md:pr-5 max-md:mt-10">
                <legend className="sr-only">Login Methods</legend>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7760829d72eaae44e26e4364ed5bfaa8fc1bcb480cc2309d4ee5e94c7bff3123?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
                  alt="Login method 1"
                  className="shrink-0 self-start max-w-full border border-solid aspect-[100] border-black border-opacity-50 stroke-[1px] stroke-black stroke-opacity-50 w-[159px]"
                />
                <span>atau</span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c519e93c814d1cf89ab83feee26039dc3063b17024389d4cffc6f2e4bbd9a7f0?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
                  alt="Login method 2"
                  className="shrink-0 my-auto max-w-full border border-solid aspect-[100] border-black border-opacity-50 stroke-[1px] stroke-black stroke-opacity-50 w-[159px]"
                />
              </fieldset>
              <label
                htmlFor="email"
                className="self-start mt-12 ml-3 text-2xl text-stone-600 max-md:mt-10 max-md:ml-2.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shrink-0 mt-1.5 max-w-full h-0.5 border-2 border-solid bg-neutral-400 border-neutral-400 w-[350px]"
              />
              <label
                htmlFor="password"
                className="flex gap-5 mt-12 max-w-full text-2xl text-stone-600 w-[351px] max-md:mt-10"
              >
                <span className="flex-auto">Kata Sandi</span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5fc93896733a5c1dfc283937cd4d59bb993ceb0683d36dfaab8cef0002d4fbd?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
                  alt=""
                  className="shrink-0 self-start aspect-[1.37] w-[22px]"
                />
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shrink-0 mt-2 max-w-full h-0.5 border-2 border-solid bg-neutral-400 border-neutral-400 w-[350px]"
              />

              <button
                type="submit"
                className="justify-center px-10 py-5 mt-11 ml-7 text-2xl text-center text-white whitespace-nowrap bg-orange-400 rounded-xl max-md:px-5 max-md:mt-10"
              >
                Masuk
              </button>

              <a
                href="#"
                className="mt-14 ml-7 text-2xl text-center text-orange-400 underline max-md:mt-10"
              >
                Lupa kata sandi?
              </a>

              <div className="mt-9 ml-7 text-2xl text-center text-orange-400 underline w-[289px]">
                <span>Belum memiliki akun?</span>
                <br />
                <a href="#" className="text-orange-400 underline">
                  Daftar
                </a>{" "}
                <span> disini.</span>
              </div>
            </div>
          </form>
          <div className="flex gap-5 mt-32 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <IconCard />
            <IconCard />
            <IconCard />
            <IconCard />
            <IconCard />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;