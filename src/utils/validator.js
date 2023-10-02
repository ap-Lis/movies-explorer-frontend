import React from 'react';

const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = React.useState(true);
    const [minLengthError, setMinLengthError] = React.useState(false);
    const [maxLengthError, setMaxLengthError] = React.useState(false);
    const [inputValid, setInputValid] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);

    React.useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true);
                break;
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
                break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false);
                break;
                case 'isEmail':
                    setEmailError(!/\S+@\S+\.\S+/.test(value));
                break;
                default:
                break;
            }
        }
    }, [value, validations])

    React.useEffect(() => {
        if (isEmpty || minLengthError || emailError || maxLengthError) {
            setInputValid(true);
        } else {
            setInputValid(false);
        }

    }, [
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
    ])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        inputValid
    }
}

const useInput = (initialValue, validations) => {
    const [value, setValue] = React.useState(initialValue);
    const [isDirty, setIsDirty] = React.useState(false);
    const valid = useValidation(value, validations);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onBlur = () => {
        setIsDirty(true);
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export { useInput };