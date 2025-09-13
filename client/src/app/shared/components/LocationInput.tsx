import { useEffect, useMemo, useState } from "react";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form"
import type { LocationIQSuggestion } from "../../../lib/types";
import { Box, debounce, List, ListItemButton, TextField, Typography } from "@mui/material";
import axios from "axios";

type Props<T extends FieldValues> = {
    label: string
} & UseControllerProps<T> 

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});
    const [loading, setLoading] = useState(false);
    const [suggestions, setSugestions] = useState<LocationIQSuggestion[]>([]);
    const [inputValue, setInputValue] = useState(field.value || '');

    useEffect(() => {
      if (field.value && typeof field.value === 'object') {
        setInputValue(field.value.venue || '');
      } else {
        setInputValue(field.value || '');
      }
     }, [field.value])

    const locationUrl = 'https://api.locationiq.com/v1/autocomplete?key=pk.f7a9adbd556370bae6c524b74cf59a57&limit=5&dedupe=1&'

    const fetchSuggestions = useMemo(
      () => debounce(async (query: string) => {
         if (!query || query.length < 3) {
          setSugestions([]);
          return;
         }

         setLoading(true);
         try {
           const res = await axios.get<LocationIQSuggestion[]>(`${locationUrl}q=${query}`)
           setSugestions(res.data)
          } catch (error) {
           console.log(error);
         } finally {
          setLoading(false);
         }
      }, 500), [locationUrl]
    );

    const handleChange = async (value: string) => {
      field.onChange(value);
      await fetchSuggestions(value);
    }

    const handleSelect = (location: LocationIQSuggestion) => {
    const city = location.address?.city || location.address?.town || location.address?.village;
    const venue = location.display_name;
    const latitude = location.lat;
    const longitude = location.lon;

    setInputValue(venue);
    field.onChange({city, venue, latitude, longitude});
    setSugestions([]);
    }

  return (
    <Box>
        <TextField 
           {...props}
           value={inputValue}
           onChange={e => handleChange(e.target.value)}
           fullWidth
           variant="outlined"
           error={!!fieldState.error}
           helperText={fieldState.error?.message}
        />
        {loading && <Typography>Loading...</Typography>}
        {suggestions.length > 0 && (
            <List sx={{border: 1}}>
               {suggestions.map(suggestion => (
                 <ListItemButton
                   divider
                   key={suggestion.place_id}
                   onClick={() => {handleSelect(suggestion)}}
                 >
                   {suggestion.display_name}
                 </ListItemButton>
               ))}
            </List>
        )}
    </Box>
  )
}
