import { useRef } from "react";
import { Controller } from "react-hook-form";

const OTPInput = ({ control }: { control: any }) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  return (
    <div className="flex justify-between">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Controller
          key={idx}
          name={`otp[${idx}]`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
               //@ts-ignore
              ref={(el) => (inputsRef.current[idx] = el as HTMLInputElement)}
              type="text"
              maxLength={1}
              className="border rounded w-10 h-10 text-center text-lg mx-1 border-gray-900 focus:border-green-500 outline-none bg-gray-200/50"
              onChange={(e) => {
                field.onChange(e);
                if (e.target.value && idx < 5) {
                  inputsRef.current[idx + 1]?.focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !e.currentTarget.value && idx > 0) {
                  inputsRef.current[idx - 1]?.focus();
                }
              }}
            />
          )}
        />
      ))}
    </div>
  );
};

export default OTPInput