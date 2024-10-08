"use client";

import { State, createTask } from "../lib/actions";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FlagIcon } from "@heroicons/react/24/solid";
import { InputLabel, Select, FormControl, MenuItem } from "@mui/material";

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
    if (state && state.success) {
      // Reset form fields
      if (formRef.current) {
        formRef.current.reset();
      }
      // refresh the page
      router.refresh();
      state.success = false;
    }
  }, [state, router, onClose]);

  return (
    <>
      <form ref={formRef} action={formAction}>
        <div id="task__title__container">
          <input
            id="task__title"
            name="title"
            placeholder="Task Title"
            type="text"
            className="text-lg text-gray-400 px-1 w-full font-light rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>

        <div
          id="duedate__priority__container"
          className="flex items-center justify-start pt-2 px-1"
        >
          <div id="duedate__container" className="relative">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MuiDatePicker
                disablePast={true}
                name="dueDate"
                format="MM/DD/YYYY"
                formatDensity="spacious"
                slotProps={{
                  openPickerIcon: {
                    component: () => (
                      <span className="w-5 h-5 text-orange-500">
                        <CalendarIcon />
                      </span>
                    ),
                  },
                  textField: {
                    size: "small",
                    sx: {
                      "& .MuiInputBase-root": {
                        color: "#f97316", // orange-500
                        fontWeight: 300, // font-light
                        height: "36px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9ca3af", //gray-400
                      },
                      "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#f97316", // orange-500
                        },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#f97316", // orange-500
                          borderWidth: "2px", // Increase border width when focused
                        },
                    },
                  },
                  popper: {
                    sx: {
                      "& .MuiPickersCalendarHeader-root": {
                        backgroundColor: "#fff7ed", // orange-50
                        color: "#9a3412", // orange-800
                      },
                      "& .MuiPickersDay-root": {
                        "&:hover": {
                          backgroundColor: "#ffedd5", // orange-100
                        },
                      },
                      "& .MuiPickersDay-root.Mui-selected": {
                        backgroundColor: "#f97316 !important", // Orange-500
                        color: "white !important", // White text for selected day
                        "&:hover": {
                          backgroundColor: "#9a3412 !important", // Orange-800
                        },
                      },
                      "& .MuiPickersDay-today.Mui-selected": {
                        border: "none", // Remove circle around current date
                        backgroundColor: "#f97316 !important", // Orange-500
                        color: "white !important", // White text for today
                      },
                      "& .MuiPickersDay-today": {
                        border: "none", // Remove circle around current date
                        backgroundColor: "#ffffff !important", // Orange-500
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </div>

          <div
            id="priority__container"
            className="flex flex-grow items-center justify-start px-2 w-36"
          >
            <FormControl fullWidth>
              <Select
                id="priority"
                name="priority"
                className="flex items-center"
                defaultValue=""
                displayEmpty
                required
                sx={{
                  height: "36px",
                  "& .MuiSelect-select": {
                    color: "#9ca3af", //gray-400
                    fontWeight: 300,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#9ca3af",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#f97316", // orange-500
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#f97316", // orange-500
                    borderWidth: "2px",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <span className="text-gray-400 ">Priority</span>
                </MenuItem>
                <MenuItem value="1">
                  <div className="flex items-center">
                    <FlagIcon
                      className="w-4 h-4 mr-2 stroke-orange-800 fill-orange-800"
                      strokeWidth={2}
                    />
                    <span className="text-gray-400 font-light">{"High"}</span>
                  </div>
                </MenuItem>
                <MenuItem value="2">
                  <div className="flex items-center">
                    <FlagIcon
                      className="w-4 h-4 mr-2 stroke-orange-500 fill-orange-500"
                      strokeWidth={2}
                    />
                    <span className="text-gray-400 font-light">{"Medium"}</span>
                  </div>
                </MenuItem>
                <MenuItem value="3">
                  <div className="flex items-center">
                    <FlagIcon
                      className="w-4 h-4 mr-2 stroke-orange-100 fill-orange-100"
                      strokeWidth={2}
                    />
                    <span className="text-gray-400 font-light">{"Low"}</span>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
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
            className=" text-gray-400 px-1 w-full font-light rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 bg-gray-200 px-4 py-2 rounded flex-1 mr-5 border-2 border-transparent hover:bg-gray-300"
          >
            {"Close"}
          </button>
          <button
            type="submit"
            className="text-white bg-orange-500 px-4 py-2 rounded flex-1 ml-5 border-2 border-transparent hover:bg-orange-600"
          >
            {"Create Task"}
          </button>
        </div>

        {state.message && (
          <div className="text-orange-800 pt-4">{state.message}</div>
        )}
      </form>
    </>
  );
}
