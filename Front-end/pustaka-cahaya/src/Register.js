import * as React from "react";

function Banner({ text }) {
  return (
    <div className="flex gap-5 self-end mt-80 max-w-full w-[687px] max-md:flex-wrap max-md:mt-10">
      <div className="flex-auto my-auto text-3xl font-light text-center text-black">{text}</div>
      <button
        className="justify-center items-center px-6 text-2xl font-extrabold text-orange-400 whitespace-nowrap bg-white shadow-sm h-[60px] rounded-[100px] w-[60px] max-md:px-5"
        aria-label="Next"
      >
        &gt;
      </button>
    </div>
  );
}

function InputField({ label, id, type = "text" }) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        className="block w-full px-3 py-2 mt-1 h-0.5 border-2 border-solid bg-neutral-400 border-neutral-400"
        type={type}
        id={id}
        placeholder={label}
        aria-label={label}
      />
    </>
  );
}

function TermsAndConditions() {
  return (
    <div className="flex gap-2.5 mt-11 text-xl max-md:flex-wrap max-md:mt-10">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e188dd6fe481355c0ea3eb586d527ea5a716b0751862a9c24dbd44fbfdf1c3fa?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
        alt="terms icon"
        className="shrink-0 self-start aspect-[0.95] w-[21px]"
      />
      <div className="flex-auto underline">
        Dengan pembuatan akun, Anda menyetujui <span className="underline">Syarat & Ketentuan</span> serta{" "}
        <span className="underline">Kebijakan Privasi</span>
      </div>
    </div>
  );
}

function Register() {
  return (
    <div className="self-center mt-7 w-full max-w-[1763px] max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <section className="flex flex-col w-9/12 max-md:ml-0 max-md:w-full">
          <article className="flex flex-col grow pt-20 pr-8 pb-10 pl-20 w-full rounded-3xl bg-neutral-300 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <Banner text="Banner Promosi" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c552ab88769d934263442f98fbc68a237e13597e2e4b77d6aab912516849491?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&" alt="Promotional Banner" className="self-center mt-96 max-w-full aspect-[7.69] w-[188px] max-md:mt-10" />
          </article>
        </section>
        <aside className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
          <form className="flex flex-col text-2xl text-stone-600 max-md:mt-10 max-md:max-w-full">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/92a16797a075ad8ac30507bf714f723500c6e728de8c5ff73a76dc10ba8ff24e?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&" alt="User Profile" className="w-full aspect-[2.44] max-md:max-w-full" />
            <section className="flex flex-col mt-24 max-md:mt-10 max-md:max-w-full">
              <InputField label="Nama Lengkap" id="fullName" />
              <InputField label="Email" id="email" type="email" />
            </section>
            <div className="flex gap-5 mt-14 max-md:flex-wrap max-md:pr-5 max-md:mt-10 max-md:max-w-full">
              <label htmlFor="password" className="sr-only">
                Kata Sandi
              </label>
              <input
                className="flex-auto block w-full px-3 py-2 mt-1 h-0.5 border-2 border-solid bg-neutral-400 border-neutral-400"
                type="password"
                id="password"
                placeholder="Kata Sandi"
                aria-label="Kata Sandi"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5fc93896733a5c1dfc283937cd4d59bb993ceb0683d36dfaab8cef0002d4fbd?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
                alt="password icon"
                className="shrink-0 self-start aspect-[1.37] w-[22px]"
              />
            </div>
            <TermsAndConditions />
            <button
              type="submit"
              className="justify-center self-center px-10 py-5 mt-12 text-center text-white whitespace-nowrap bg-orange-400 rounded-xl max-md:px-5 max-md:mt-10"
            >
              Daftar
            </button>
            <div className="self-center mt-28 text-center text-orange-400 underline w-[289px] max-md:mt-10">
              <span>Sudah memiliki akun?</span>
              <br />
              <span className="text-orange-400 underline">Masuk</span>
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
}

export default Register;