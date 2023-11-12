/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface SignupProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Signup({ setToggle }: SignupProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{6,}$/;

  const [errorEmail, setErrorEmail] = useState("");
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-14">
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          회원가입 페이지
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit(async (data) => {
            try {
              const result = await axios.post("/api/user", {
                ...data,
              });

              if (result.status === 200) {
                toast.success("회원가입이 완료되었습니다🎉");
                setToggle(false);
              }
            } catch (error: any) {
              if (error.response && error.response.status === 400) {
                setErrorEmail("중복된 이메일 입니다.");
              } else {
                console.error("Unhandled error:", error);
              }
            }
          })}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold  text-gray-900"
            >
              이메일
            </label>
            <div className="mt-1">
              <input
                {...register("email", {
                  required: true,
                  pattern: emailRegex,
                })}
                type="email"
                placeholder="Email"
                onBlur={() => setErrorEmail("")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errorEmail && (
              <div className="text-xs text-red-600">{errorEmail}</div>
            )}
            {errors?.email?.type === "required" && (
              <div className="text-xs text-red-600">내용을 입력해주세요!</div>
            )}
            {errors?.email?.type === "pattern" && (
              <div className="text-xs text-red-600">
                이메일 양식에 맞게 입력해주세요!
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold  text-gray-900"
            >
              비밀번호
            </label>
            <div className="mt-1">
              <input
                {...register("password", {
                  required: true,
                  pattern: passwordRegex,
                })}
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors?.password?.type === "required" && (
              <div className="text-xs text-red-600">내용을 입력해주세요!</div>
            )}
            {errors?.password?.type === "pattern" && (
              <div className="text-xs text-red-600">
                소문자, 숫자, 특수문자를 각 하나 포함한 6자리 이상이여야 합니다.
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-bold  text-gray-900"
              >
                닉네임
              </label>
            </div>
            <div className="mt-1">
              <input
                {...register("name", { required: true, minLength: 2 })}
                id="password"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors?.name?.type === "required" && (
              <div className="text-xs text-red-600">내용을 입력해주세요!</div>
            )}
            {errors?.name?.type === "minLength" && (
              <div className="text-xs text-red-600">
                2글자 이상 작성해주세요
              </div>
            )}
            <p
              className="text-sm mt-1 text-right font-semibold underline cursor-pointer"
              onClick={() => setToggle(false)}
            >
              로그인하기
            </p>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
