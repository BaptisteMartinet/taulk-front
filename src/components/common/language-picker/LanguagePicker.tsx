import React, { FunctionComponent } from 'react';
import i18next from 'i18next';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import i18n, { Language } from 'core/i18n';

const LanguagePicker: FunctionComponent = () => {
  const [lang, setLang] = React.useState(i18next.language as Language);

  const handleChange = (event: SelectChangeEvent): void => {
    const newLang = event.target.value as Language;
    i18n.changeLanguage(newLang).catch(() => { });
    setLang(newLang);
  };
  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <Select
          id="language-select"
          value={lang}
          onChange={handleChange}
          variant="standard"
        >
          <MenuItem value={Language.EN}>EN</MenuItem>
          <MenuItem value={Language.FR}>FR</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguagePicker;
