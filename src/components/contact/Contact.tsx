import { useForm, ValidationError } from "@formspree/react";
import Script from "next/script";
import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

const INPUT_CLASSES =
  "bg-white/40 border border-solid border-gray-500/30 rounded-xl shadow-inner-xl h-12 px-4 py-3 outline-blue-400";

const ContactForm: FC = () => {
  const [state, handleSubmit] = useForm("mgeprznq");

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js"
        async
        defer
      ></Script>
      <section id="contact" className="w-full h-screen">
        <div className="mx-auto max-w-2xl size-full flex justify-center items-center flex-col gap-6 p-8">
          {state.succeeded && (
            <p className="text-xl font-extrabold">Thanks for your message!</p>
          )}
          {!state.succeeded && (
            <>
              <h2 className="font-extrabold text-3xl">Contact</h2>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-2"
              >
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="font-extrabold">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className={INPUT_CLASSES}
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="font-extrabold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={twMerge(INPUT_CLASSES, "h-32 resize-none")}
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>

                <div
                  className="g-recaptcha"
                  data-sitekey="6LdbWkgpAAAAACBJqTz0WZ1iL0y1dMs8YfUVgRhM"
                ></div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="bg-teal-400 hover:bg-teal-500 active:scale-95 transition-all duration-300 px-4 py-3 rounded-xl leading-none text-xl font-extrabold"
                >
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ContactForm;
