import { Box, Typography } from '@mui/material';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const tabPanel = (
    <Box sx={{ p: 3 }}>
      <div>{children}</div>
    </Box>
  );

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && tabPanel}
    </div>
  );
}
