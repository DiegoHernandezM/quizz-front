import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/system";

const Question = ({
  question,
  value,
  showAnswer,
  disabled,
  handleChange,
  rightAnswer,
}) => {
  return (
    <FormControl
      error={value !== question.answer && showAnswer === 1}
      fullWidth
      sx={{ marginTop: "25px" }}
    >
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        sx={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "10px" }}
      >
        {question.question}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        name={`${question.id}`}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      >
        <FormControlLabel
          value="A"
          control={<Radio />}
          label={`A) ${question.a}`}
          disabled={disabled}
          sx={{ marginBottom: "10px" }}
          componentsProps={{
            typography: {
              sx: {
                "&.Mui-disabled": {
                  color:
                    "A" !== question.answer
                      ? "red !important"
                      : "green !important",
                },
              },
            },
          }}
        />
        <FormControlLabel
          value="B"
          control={<Radio />}
          label={`B) ${question.b}`}
          disabled={disabled}
          sx={{ marginBottom: "10px" }}
          componentsProps={{
            typography: {
              sx: {
                "&.Mui-disabled": {
                  color:
                    "B" !== question.answer
                      ? "red !important"
                      : "green !important",
                },
              },
            },
          }}
        />
        <FormControlLabel
          value="C"
          control={<Radio />}
          label={`C) ${question.c}`}
          disabled={disabled}
          sx={{ marginBottom: "10px" }}
          componentsProps={{
            typography: {
              sx: {
                "&.Mui-disabled": {
                  color:
                    "C" !== question.answer
                      ? "red !important"
                      : "green !important",
                },
              },
            },
          }}
        />
        {question.d && (
          <FormControlLabel
            value="D"
            control={<Radio />}
            label={`D) ${question.d}`}
            disabled={disabled}
            sx={{ marginBottom: "10px" }}
            componentsProps={{
              typography: {
                sx: {
                  "&.Mui-disabled": {
                    color:
                      "D" !== question.answer
                        ? "red !important"
                        : "green !important",
                  },
                },
              },
            }}
          />
        )}
        {question.e && (
          <FormControlLabel
            value="E"
            control={<Radio />}
            label={`E) ${question.e}`}
            disabled={disabled}
            sx={{ marginBottom: "10px" }}
            componentsProps={{
              typography: {
                sx: {
                  "&.Mui-disabled": {
                    color:
                      "E" !== question.answer
                        ? "red !important"
                        : "green !important",
                  },
                },
              },
            }}
          />
        )}
      </RadioGroup>
    </FormControl>
  );
};

export default Question;
