import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React, { forwardRef, useState } from 'react'
import { IMaskInput } from 'react-imask';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="+7(000) 000-00-00"
                // definitions={{
                //     '#': /[1-9]/,
                // }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

export default function InputMask() {
    const [values, setValues] = useState({
        textmask: '(000) 000-00-00',
        numberformat: '1320',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
  return (
      <FormControl>
          <InputLabel htmlFor="formatted-text-mask-input">your phone number</InputLabel>
          <OutlinedInput
              label="your phone number"
              size='small'
              value={values.textmask}
              onChange={handleChange}
              name="textmask"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
              sx={{
                  textAlign: 'center',
                  justifyContent: 'center'
              }}
          />
      </FormControl>
  )
}
