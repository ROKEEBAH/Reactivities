import { Box, Container, CssBaseline, Typography} from "@mui/material";
import {  useState } from "react"
import NavBar from "./NavBar";
import ActitivityDashboard from "../../features/activities/dashboard/ActitivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);
  const {activities, isPending} = useActivities();
  


 
const handleSelectActivity = (id: string) => {
  setSelectedActivity(activities!.find(x=> x.id === id));
}

const handleCancelSelectActivity = () => {
  setSelectedActivity(undefined);
  
}

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  }

    const handleFormClose = () => {
      setEditMode(false);
    }
    
     
    
  
  return (
      <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
      <CssBaseline />
      <NavBar  openForm={handleOpenForm}/>
      <Container maxWidth='xl' sx={{mt: 3}}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActitivityDashboard  
        activities={activities}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        selectedActivity={selectedActivity}
        editMode={editMode}
        openForm={handleOpenForm} 
        closeForm={handleFormClose}
        />
        )}
        
      </Container>
      </Box>
      
    
  )
}

export default App
