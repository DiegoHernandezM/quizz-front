import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";

const Question = ({ question, value, showAnswer, disabled, handleChange }) => {
  return (
    <FormControl
      error={value !== question.answer && showAnswer === 1}
      fullWidth
    >
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        sx={{ fontWeight: "bold", fontSize: "1rem" }}
      >
        {question.question}
      </FormLabel>
      <RadioGroup
        row
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
        />
        <FormControlLabel
          value="B"
          control={<Radio />}
          label={`B) ${question.b}`}
          disabled={disabled}
        />
        <FormControlLabel
          value="C"
          control={<Radio />}
          label={`C) ${question.c}`}
          disabled={disabled}
        />
        {question.d && (
          <FormControlLabel
            value="D"
            control={<Radio />}
            label={`D) ${question.d}`}
            disabled={disabled}
          />
        )}
        {question.e && (
          <FormControlLabel
            value="E"
            control={<Radio />}
            label={`E) ${question.e}`}
            disabled={disabled}
          />
        )}
      </RadioGroup>
      {showAnswer === 1 && value !== question.answer && (
        <FormHelperText>{question.explanation}</FormHelperText>
      )}
    </FormControl>
  );
};

export default Question;
