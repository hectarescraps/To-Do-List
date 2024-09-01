"use client";

import { now, getLocalTimeZone } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { State, createTask } from "../lib/actions";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
      className="ml-1 w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
      />
    </svg>
  );
}

export function TaskForm({ onClose }: { onClose: () => void }) {
  const initialState: State = { errors: {}, message: null, success: false };
  const [state, formAction] = useFormState(createTask, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      // Reset form fields
      if (formRef.current) {
        formRef.current.reset();
      }
      // refresh the page
      router.refresh();
    }
  }, [state.success, router, onClose]);

  return (
    <>
      <form ref={formRef} action={formAction}>
        <div id="task__title__container">
          <input
            id="task__title"
            name="title"
            placeholder="Task Title"
            type="text"
            className="text-lg text-gray-400 px-1 w-full font-light"
          />
        </div>
        <div id="task__subtitle__container">
          <input
            id="task__subtitle"
            name="subtitle"
            placeholder="Task Subtitle"
            type="text"
            className="text-sm font-light text-gray-400 px-1 w-full"
          />
        </div>
        <div
          id="duedate__priority__container"
          className="flex items-center justify-start pt-2 px-1"
        >
          <div id="duedate__container" className="relative">
            <DatePicker
              className="text-orange-500 font-light text-sm border border-orange-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
              label=""
              name="dueDate"
              defaultValue={now(getLocalTimeZone())}
              granularity="day"
              isRequired
              selectorIcon={
                <span className="w-5 h-5 text-orange-500">
                  <CalendarIcon />
                </span>
              }
              popoverProps={{
                placement: "bottom",
                shouldFlip: false,
                backdrop: "opaque",
                className:
                  "bg-black text-white border border-orange-300 rounded-md shadow-lg p-2",
              }}
            />
          </div>
          <div
            id="priority__container"
            className="flex flex-grow items-center justify-start px-2"
          >
            <select
              id="priority"
              name="priority"
              className="w-full rounded-md border border-gray-100 text-sm font-light"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" className="text-gray-400" disabled>
                {"Priority"}
              </option>
              <option value="1" className="text-red-600">
                {"Priority: 1"}
              </option>
              <option value="2" className="text-red-300">
                {"Priority: 2"}
              </option>
              <option value="3" className="text-red-100">
                {"Priority: 3"}
              </option>
            </select>
          </div>
        </div>
        <div
          id="project__label__container"
          className="flex items-center justify-start pt-2 px-1"
        >
          <input
            id="project"
            name="project"
            placeholder="Project"
            type="text"
            className=" text-gray-400 px-1 w-full font-light"
          />
          <input
            id="label"
            name="label"
            placeholder="Label"
            type="text"
            className=" text-gray-400 px-1 w-full font-light"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 bg-gray-200 px-4 py-2 rounded flex-1 mr-5"
          >
            {"Close"}
          </button>
          <button
            type="submit"
            className="text-white bg-orange-500 px-4 py-2 rounded flex-1 ml-5"
          >
            {"Create Task"}
          </button>
        </div>
      </form>
    </>
  );
}
