import { useTheme } from "../theme-provider";
import CreatableSelect from 'react-select/creatable';
import Select, { Props as SelectProps } from 'react-select';

interface HYReactSelectProps extends SelectProps {
    showDropDownIndicator?: boolean;
    showIndicatorSeparator?: boolean;
}

const HYReactSelect: React.FC<HYReactSelectProps> = (props) => {
    const { theme } = useTheme();


    const { showDropDownIndicator = true, showIndicatorSeparator = false } = props


    return (
        <CreatableSelect
            {...props}
            theme={(themes) => ({
                ...themes,
                borderRadius: 0,
                colors: {
                    ...themes.colors,
                    primary: theme === "dark" ? "#202228" : "#E2E8F0",
                },
            })}
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    backgroundColor: theme === "dark" ? "#111215" : "white",
                    borderColor: theme === "dark" ? "#202228" : "#E2E8F0",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    '&:hover': {
                        borderColor: theme === "dark" ? "#202228" : "#E2E8F0",
                    },
                    cursor: "text",
                    outline: "none",
                }),
                option: (provided, state) => ({
                    ...provided,
                    fontSize: "0.75rem",
                    color: theme === "dark" ? "white" : "",
                    backgroundColor: theme === "dark" ? "#111215" : "white",
                }),
                container: (provided) => ({
                    ...provided,
                }),
                menu: (provided) => ({
                    ...provided,
                    backgroundColor: theme === "dark" ? "#202228" : "white",
                    color: theme === "dark" ? "white" : "",
                    borderColor: theme === "dark" ? "#202228" : "#E2E8F0",
                }),
                multiValueLabel: (provided) => ({
                    ...provided,
                    color: '#71A4FF',

                }),
                input: (provided) => ({
                    ...provided,
                    color: theme === "dark" ? '#fff' : "",
                }),
                singleValue: (provided) => ({
                    ...provided,
                    color: theme === "dark" ? "white" : "",
                }),
                multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: theme === "dark" ? "#414144" : "#E9F2FF",
                    borderRadius: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0px 6px',
                }),
                multiValueRemove: (provided) => ({
                    ...provided,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '4px',
                    padding: '2px',
                }),
                dropdownIndicator: (provided) => ({
                    ...provided,
                    display: showDropDownIndicator ? '' : "none",
                }),
                indicatorSeparator: (provided) => ({
                    ...provided,
                    display: showIndicatorSeparator ? "" : 'none',
                }),
            }}
        />
    )
}

export default HYReactSelect
